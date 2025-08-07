<?php // Backend/Apis/GetDenuncias.php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { exit; } 

if ($_SERVER['REQUEST_METHOD'] !== 'GET'){
    http_response_code(405);
    echo json_encode(['error' => 'Metodo no permitido, solo se permite GET']);
    exit;
}

$csv = __DIR__.'/Denuncias.csv';
$filas = [];

if (file_exists($csv)){
    $lineas = file($csv);
    $filas = array_map('str_getcsv', $lineas);
}

$denuncias = array_map(function ($r) {
    return [
        'id'          => $r[0],
        'tipo'        => $r[1],
        'descripcion' => $r[2],
        'lat'         => $r[3],
        'lng'         => $r[4],
        'fecha'       => $r[5],
        'foto'        => $r[6],
    ];

}, $filas);

if (isset($_GET['id'])){
    $id = (int) $_GET['id'];
    $match = array_filter($denuncias, fn($d) => (int)$d['id'] === $id);
    if (!$match){
        http_response_code(404);
        echo json_encode(['mensaje' => 'Denuncia no encontrada']);
    }
    echo json_encode(array_values($match)[0]);
    exit;
}

if(isset($_GET['tipo'])){
    $tipo = $_GET['tipo'];
    $denuncias = array_filter($denuncias, fn($d) => strcasecmp($d['tipo'], $tipo) === 0);
}

echo json_encode(array_values($denuncias));

?>