<?php

class Denuncia {
    public int $id = 0;

    public function __construct(
        public string $tipo,
        public string $descripcion,
        public float  $lat,
        public float  $lng,
        public string $foto,
        public string $fecha = '',  // ← sin coma final
        public string $ciudad
    ){
        $this->fecha = $this->fecha ?: date('c');
    }

    public function toArray(): array
    {
        return [
            $this->id,
            $this->tipo,
            $this->descripcion,
            $this->lat,
            $this->lng,
            $this->foto,
            $this->fecha,
            $this->ciudad
        ];
    }

}

?>
