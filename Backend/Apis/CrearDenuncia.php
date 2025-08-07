<?php
require_once __DIR__. '/Denuncia.php';
require_once __DIR__. '/CSVRepositorio.php';
function respuesta(array $array, int $c=200){
    http_response_code($c);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($array); exit;
}
$fila = file_get_contents('php://input');
file_put_contents('php://stderr', "RAW = $fila\n");
$body = json_decode($fila, true) ;

foreach(['tipo', 'descripcion', 'lat', 'lng', 'foto'] as $campo){
    if(empty($body[$campo])){
        respuesta(['status' => 'error', "msg" => "Falta el campo $campo"], 400);
    }
}

$denuncia = new Denuncia(
    htmlspecialchars($body['tipo']),
    htmlspecialchars($body['descripcion']),
    (float)$body['lat'],
    (float)$body['lng'],
    basename($body['foto'])
);
$rutaBase = __DIR__ . '/Denuncias.csv';
$repositorio = new CSVRepositorio($rutaBase);
$id = $repositorio->guardar($denuncia);
respuesta(['status'=>'success', 'id'=>$id, 'mensaje'=> 'Denuncia registrada correctamente']);
?>