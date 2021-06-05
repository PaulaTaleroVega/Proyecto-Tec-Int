<?php
    require_once ('../daos/UsuarioDAO.php');
    
    $cuerpo = file_get_contents('php://input');
    $userDTO = json_decode($cuerpo);
	
	
    $userDAO = new UsuarioDAO();
    $user = new Usuario($userDTO->Nombre,$userDTO->Contrasena,$userDTO->Correo);
    $results = $userDAO->create($user);
    echo $results;
?>