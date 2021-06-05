<?php

class Ruta {

    var $Nombre;
    var $Horarios;
    var $Cordenadas;
    var $CiudadDestino;
    var $CiudadOrigen;
    var $Tiempo;
    var $Distancia;
    var $Mapa;

    function __construct($Nombre, $Horarios, $Cordenadas, $CiudadDestino, $CiudadOrigen, $Tiempo, $Distancia, $Mapa)
    {
        $this->Nombre = $Nombre;
        $this->Horarios = $Horarios;
        $this->Cordenadas = $Cordenadas;
        $this->CiudadDestino = $CiudadDestino;
        $this->CiudadOrigen = $CiudadOrigen;
        $this->Tiempo = $Tiempo;
        $this->Distancia = $Distancia;
        $this->Mapa = $Mapa;
    }
    

}
?>