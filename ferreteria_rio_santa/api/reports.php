<?php
require 'db.php';
requireAdmin();

$v = $pdo->query('SELECT COUNT(*) AS n, COALESCE(SUM(total),0) AS t FROM ventas')->fetch();
$valor = (float)$pdo->query('SELECT COALESCE(SUM(stock * precio),0) FROM productos')->fetchColumn();
$bajos = $pdo->query('SELECT nombre, stock FROM productos WHERE stock < 10 ORDER BY stock, nombre')->fetchAll();
foreach ($bajos as &$b) $b['stock'] = (int)$b['stock'];
unset($b);

$porCat = [];
foreach ($pdo->query('SELECT categoria, SUM(stock * precio) AS v FROM productos GROUP BY categoria')->fetchAll() as $r) {
    $porCat[$r['categoria']] = (float)$r['v'];
}

out(['ok' => true, 'ventas' => (int)$v['n'], 'total' => (float)$v['t'], 'valor' => $valor, 'bajos' => $bajos, 'porCat' => $porCat]);