<?php
require_once 'Denuncia.php';
require_once 'CSVRepositorio.php';
function respuesta(array $array, int $c=200){
    http_response_code($c);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($array); exit;
}
$body = json_decode(file_get_contents('php://input'), true) ??[];

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
$repositorio = new CSVRepositorio('Denuncias.csv');
$id = $repositorio->guardar($denuncia);
respuesta(['status'=>'success', 'id'=>$id, 'mensaje'=> 'Denuncia registrada correctamente']);
?>