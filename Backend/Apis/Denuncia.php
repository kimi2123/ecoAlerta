<?php

class Denuncia {
    public function __construct( 
        public string $tipo,
        public string $descripcion,
        public float $lat,
        public float $lng,
        public string $foto,
        public string $fecha = '',
    ){
        $this->fecha = $fecha ?: date('c');
    }
    
    public function toArray(): array {
        return [
            $this->tipo,
            $this->descripcion,
            $this->lat,
            $this->lng,
            $this->foto,
            $this->fecha,
        ];
    }

}

?>