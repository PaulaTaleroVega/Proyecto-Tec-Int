<?php
    require_once ('../daos/ViajeDAO.php');
    $viajeDAO = new UsuarioDAO();
    $results= json_encode($viajeDAO->readAll());
    echo $results;
?>