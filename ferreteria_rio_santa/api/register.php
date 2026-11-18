<?php
require_once 'db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'mensaje' => 'Método no permitido'], JSON_UNESCAPED_UNICODE);
    exit;
}

$data = body();

$nombre = trim($data['nombre'] ?? '');
$correo = trim($data['correo'] ?? '');
$password = (string)($data['password'] ?? '');

if (empty($nombre) || empty($correo) || empty($password)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'mensaje' => 'Por favor, completa todos los campos.'], JSON_UNESCAPED_UNICODE);
    exit;
}

if (!filter_var($correo, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'mensaje' => 'El formato del correo no es válido.'], JSON_UNESCAPED_UNICODE);
    exit;
}

try {
    // Verificar si el usuario o correo ya existen
    $stmtCheck = $pdo->prepare('SELECT id FROM usuarios WHERE correo = ? OR nombre = ?');
    $stmtCheck->execute([$correo, $nombre]);
    if ($stmtCheck->fetch()) {
        http_response_code(409);
        echo json_encode(['ok' => false, 'mensaje' => 'Ese usuario o correo ya se encuentra registrado.'], JSON_UNESCAPED_UNICODE);
        exit;
    }

    // Insertar usuario nuevo (Asignando rol_id = 1 para cliente)
    $stmtInsert = $pdo->prepare('INSERT INTO usuarios (nombre, correo, password, rol_id) VALUES (?, ?, ?, 1)');
    $stmtInsert->execute([
        $nombre,
        $correo,
        password_hash($password, PASSWORD_DEFAULT)
    ]);

    echo json_encode([
        'ok' => true,
        'mensaje' => '¡Registro exitoso! Ya puedes iniciar sesión.'
    ], JSON_UNESCAPED_UNICODE);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'mensaje' => 'Error en base de datos: ' . $e->getMessage()], JSON_UNESCAPED_UNICODE);
}