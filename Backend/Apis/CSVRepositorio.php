<?php
const CSV_HEADERS = ['tipo', 'descripcion', 'lat', 'lng', 'foto', 'fecha'];

class CSVRepositorio {
    public function __construct(private string $file){
        if(!file_exists($file)){
            $archivo = fopen($file, 'w');
            fputs($archivo, CSV_HEADERS);
            fclose($archivo);
        }
    }

    public function guardar(Denuncia $denuncia): int {
        $archivo = fopen($this->file, 'a');
        flock($archivo, LOCK_EX);
        fputcsv($archivo, $denuncia->toArray());
        fflush($archivo);
        flock($archivo, LOCK_UN);
        fclose($archivo);

        return max(0,count(file($this->file))-1);

    }

    public function obtener(array $array = []): array {
        $salida = [];
        if(($archivo = fopen($this->file, 'r')) !== false){
            $cabeceras = fgetcsv($archivo);
            while (($fila = fgetcsv($archivo)) !== false) {
                $salida[] = array_combine($cabeceras, $row);
            }
            fclose($archivo);
        }
        return $salida;
    }

}
?>