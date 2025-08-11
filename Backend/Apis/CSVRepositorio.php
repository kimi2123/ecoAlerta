<?php
const CSV_HEADERS = ['id','tipo', 'descripcion', 'lat', 'lng', 'foto', 'fecha', 'ciudad'];

class CSVRepositorio {
    public function __construct(private string $file){
        if(!file_exists($file)){
            $archivo = fopen($file, 'w');
            fputs($archivo, implode(',', CSV_HEADERS) . PHP_EOL);
            fclose($archivo);
        }
    }

    private function siguienteId(): int {
        return max(0, count(file($this->file)) - 1 + 1);
    }

    public function guardar(Denuncia $denuncia): int {
        $denuncia->id = $this->siguienteId();

        $archivo = fopen($this->file, 'a');
        flock($archivo, LOCK_EX);
        fputcsv($archivo, $denuncia->toArray());
        fflush($archivo);
        flock($archivo, LOCK_UN);
        fclose($archivo);

        return $denuncia->id;

    }

    public function obtener(array $array = []): array {
        $salida = [];
        if(($archivo = fopen($this->file, 'r')) !== false){
            $cabeceras = fgetcsv($archivo);
            while (($fila = fgetcsv($archivo)) !== false) {
                $salida[] = array_combine($cabeceras, $fila);
            }
            fclose($archivo);
        }
        return $salida;
    }

}
?>