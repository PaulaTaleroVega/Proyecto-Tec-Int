<?php

class Usuario {

    var $NombreApellido;
    var $Contrasena;
    var $Correo;

    function __construct($NombreApellido, $Contrasena, $Correo)
    {
        $this->NombreApellido = $NombreApellido;
        $this->Contrasena = $Contrasena;
        $this->Correo = $Correo;
    }
    

}
?>