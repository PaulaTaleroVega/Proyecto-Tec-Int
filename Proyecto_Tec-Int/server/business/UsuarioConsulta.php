<?php
    require_once ('../daos/UsuarioDAO.php');
    $usuarioDAO = new UsuarioDAO();
    $results= json_encode($usuarioDAO->readAll());
    echo $results;
?>