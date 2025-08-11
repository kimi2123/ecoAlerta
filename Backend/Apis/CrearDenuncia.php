<?php
require_once __DIR__. '/Denuncia.php';
require_once __DIR__. '/CSVRepositorio.php';


function respuesta(array $array, int $c=200){
    http_response_code($c);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($array); exit;
}


#$fila = file_get_contents('php://input');
#file_put_contents('php://stderr', "RAW = $fila\n");
#$body = json_decode($fila, true) ;

foreach(['tipo', 'descripcion', 'lat', 'lng','ciudad'] as $campo){
    if(!isset($_POST[$campo]) || $_POST[$campo] === ''){
        respuesta(['status' => 'error', "msg" => "Falta el campo $campo"], 400);
    }
}

    if(!isset($_FILES['foto']) || $_FILES['foto']['error'] !== UPLOAD_ERR_OK){
        respuesta(['status' => 'error', "msg" => "Falta la foto o ocurrio un error al subirla"], 400);
    }

    $allow =['jpg', 'jpeg', 'png', 'webp'];
    $ext = strtolower(pathinfo($_FILES['foto']['name'], PATHINFO_EXTENSION));
    if(!in_array($ext, $allow)){
        respuesta(['status' => 'error', "msg" => "Formato de foto no permitido. "], 400);
    }

    $imagen = __DIR__. '/imagenes';
    

    #guardar la imagen
    $filename = uniqid('den_', true).'.'.$ext;
    $dest = $imagen.'/'.$filename;
    if (!move_uploaded_file($_FILES['foto']['tmp_name'], $dest)) {
    respuesta(['status'=>'error','msg'=>'No se pudo guardar la imagen'], 500);
    }

    $dirFoto = 'imagenes/'.$filename;

$denuncia = new Denuncia(
    htmlspecialchars($_POST['tipo']),
    htmlspecialchars($_POST['descripcion']),
    (float)$_POST['lat'],
    (float)$_POST['lng'],
    $dirFoto,
    isset($_POST['fecha']) ? $_POST['fecha'] : '',
    htmlspecialchars($_POST['ciudad']),
);

$rutaBase = __DIR__ . '/Denuncias.csv';
$repositorio = new CSVRepositorio($rutaBase);
$id = $repositorio->guardar($denuncia);
respuesta(['status'=>'success', 'id'=>$id, 'mensaje'=> 'Denuncia registrada correctamente']);

?>
