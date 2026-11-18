<?php
require 'db.php';

$u = user();

if (!$u) {
    out(['ok' => false, 'error' => 'No hay sesión activa'], 401);
}
// Solo los CLIENTES pueden comprar. El administrador y el desarrollador solo consultan.
$rolActual = strtolower((string)($u['rol'] ?? ''));
$rolIdActual = (int)($u['rol_id'] ?? 0);
if (
    $rolIdActual === 2 || $rolIdActual === 3 ||
    strpos($rolActual, 'admin') !== false ||
    strpos($rolActual, 'desarrollador') !== false
) {
    out(['ok' => false, 'error' => 'El administrador no puede realizar compras. Ingresa con una cuenta de cliente.'], 403);
}
$b = body();
$items = $b['items'] ?? [];

if (empty($items) || !is_array($items)) {
    out(['ok' => false, 'error' => 'El carrito está vacío'], 400);
}

try {
    $pdo->beginTransaction();

    // Unir líneas repetidas del mismo producto
    $lineas = [];
    foreach ($items as $item) {
        $id = (int)($item['id'] ?? 0);
        $cantidad = (int)($item['cantidad'] ?? 0);
        if ($id <= 0 || $cantidad <= 0) continue;

        if (isset($lineas[$id])) {
            $lineas[$id]['cantidad'] += $cantidad;
        } else {
            $lineas[$id] = ['id' => $id, 'cantidad' => $cantidad];
        }
    }

    if (empty($lineas)) {
        throw new Exception('El carrito está vacío');
    }

    $stBuscar = $pdo->prepare('SELECT id, nombre, precio, stock FROM productos WHERE id = ? FOR UPDATE');

    $subtotalGeneral = 0;
    $detalleVentaBD = [];

    foreach ($lineas as $linea) {
        $id = $linea['id'];
        $cantidad = $linea['cantidad'];

        $stBuscar->execute([$id]);
        $prod = $stBuscar->fetch(PDO::FETCH_ASSOC);

        // El servidor NUNCA crea productos: si no existe, se rechaza la compra
        if (!$prod) {
            throw new Exception("El producto con ID $id no existe en la base de datos.");
        }

        if ((int)$prod['stock'] < $cantidad) {
            throw new Exception('Stock insuficiente para: ' . $prod['nombre'] . ' (Disponible: ' . $prod['stock'] . ')');
        }

        // El precio siempre sale de la base de datos
        $precioUnitario = (float)$prod['precio'];
        $subtotalGeneral += $precioUnitario * $cantidad;

        $detalleVentaBD[] = [
            'id'       => (int)$prod['id'],
            'nombre'   => $prod['nombre'],
            'precio'   => $precioUnitario,
            'cantidad' => $cantidad
        ];
    }

    $unidadesTotales = array_sum(array_column($detalleVentaBD, 'cantidad'));
    $descuento = ($unidadesTotales >= 10)
        ? ($subtotalGeneral * 0.10)
        : (($unidadesTotales >= 5) ? ($subtotalGeneral * 0.05) : 0);
    $totalGeneral = $subtotalGeneral - $descuento;

    $fechaActual = date('Y-m-d H:i:s');
    $usuarioId = $u['id'] ?? 1;

    // ¿La tabla ventas tiene columna 'boleta'?
    $tieneBoleta = false;
    try {
        $check = $pdo->query("SHOW COLUMNS FROM ventas LIKE 'boleta'");
        if ($check && $check->rowCount() > 0) $tieneBoleta = true;
    } catch (Exception $ex) {}

    $numBoleta = 'B001-TEMP' . rand(1000, 9999);

    if ($tieneBoleta) {
        $stVenta = $pdo->prepare('INSERT INTO ventas (boleta, usuario_id, subtotal, descuento, total, fecha) VALUES (?, ?, ?, ?, ?, ?)');
        $stVenta->execute([$numBoleta, $usuarioId, $subtotalGeneral, $descuento, $totalGeneral, $fechaActual]);
    } else {
        $stVenta = $pdo->prepare('INSERT INTO ventas (usuario_id, subtotal, descuento, total, fecha) VALUES (?, ?, ?, ?, ?)');
        $stVenta->execute([$usuarioId, $subtotalGeneral, $descuento, $totalGeneral, $fechaActual]);
    }

    $ventaId = (int)$pdo->lastInsertId();

    // Boleta única basada en el id de la venta: B001-000123
    $numBoleta = 'B001-' . str_pad((string)$ventaId, 6, '0', STR_PAD_LEFT);
    if ($tieneBoleta) {
        $pdo->prepare('UPDATE ventas SET boleta = ? WHERE id = ?')->execute([$numBoleta, $ventaId]);
    }

    // Detectar columna de precio en detalle_venta
    $colPrecio = 'precio_unitario';
    $checkCol = $pdo->query("SHOW COLUMNS FROM detalle_venta LIKE 'precio'");
    if ($checkCol && $checkCol->rowCount() > 0) {
        $colPrecio = 'precio';
    }

    $stDetalle = $pdo->prepare("INSERT INTO detalle_venta (venta_id, producto_id, cantidad, {$colPrecio}) VALUES (?, ?, ?, ?)");
    $stStock = $pdo->prepare('UPDATE productos SET stock = stock - ? WHERE id = ?');

    foreach ($detalleVentaBD as $det) {
        $stDetalle->execute([$ventaId, $det['id'], $det['cantidad'], $det['precio']]);
        $stStock->execute([$det['cantidad'], $det['id']]);
    }

    $pdo->commit();

    out([
        'ok'       => true,
        'mensaje'  => 'Compra registrada con éxito',
        'venta_id' => $ventaId,
        'total'    => $totalGeneral,
        'venta'    => [
            'boleta'    => $numBoleta,
            'fecha'     => date('d/m/Y H:i'),
            'items'     => $detalleVentaBD,
            'subtotal'  => $subtotalGeneral,
            'descuento' => $descuento,
            'total'     => $totalGeneral
        ]
    ]);

} catch (Exception $e) {
    if ($pdo->inTransaction()) {
        $pdo->rollBack();
    }
    out(['ok' => false, 'error' => $e->getMessage()], 400);
}