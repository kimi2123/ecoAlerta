<?php
require_once __DIR__ . '/Denuncia.php';  
require_once __DIR__ . '/CSVRepositorio.php';  

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { exit; } 

if ($_SERVER['REQUEST_METHOD'] !== 'GET'){
    http_response_code(405);
    echo json_encode(['error' => 'Método no permitido, solo se permite GET']);
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
        'foto'        => $r[5],
        'fecha'       => $r[6],
        'ciudad'      => $r[7], 
    ];
}, $filas);

$filtros = [];

if (isset($_GET['id'])){
    $id = (int) $_GET['id'];
    $match = array_filter($denuncias, fn($d) => (int)$d['id'] === $id);
    if (!$match){
        http_response_code(404);
        echo json_encode(['mensaje' => 'Denuncia no encontrada']);
        exit;
    }
    echo json_encode(array_values($match)[0]);
    exit;
}

if (isset($_GET['tipo'])){
    $tipo = $_GET['tipo'];
    $denuncias = array_filter($denuncias, fn($d) => strcasecmp($d['tipo'], $tipo) === 0);
    $filtros['tipo'] = $tipo;
}

if (isset($_GET['anio'])){
    $anio = (int) $_GET['anio'];
    $denuncias = array_filter($denuncias, function($d) use ($anio) {
        return date('Y', strtotime($d['fecha'])) == $anio;
    });
    $filtros['anio'] = $anio;
}

if (isset($_GET['ciudad'])){
    $ciudad = $_GET['ciudad'];
    $denuncias = array_filter($denuncias, function($d) use ($ciudad) {
        return stripos($d['ciudad'], $ciudad) !== false; 
    });
    $filtros['ciudad'] = $ciudad;
}

if (!empty($filtros)) {
    $newCsvFile = __DIR__ . '/DenunciasFiltradas.csv';
    $repositorioFiltrado = new CSVRepositorio($newCsvFile);

    foreach ($denuncias as $denuncia) {
        $denunciaObj = new Denuncia(
            $denuncia['tipo'],
            $denuncia['descripcion'],
            (float)$denuncia['lat'],
            (float)$denuncia['lng'],
            $denuncia['foto'],
            $denuncia['fecha'],
            $denuncia['ciudad']
        );
        $repositorioFiltrado->guardar($denunciaObj);  
    }
}

echo json_encode(array_values($denuncias));
?>
