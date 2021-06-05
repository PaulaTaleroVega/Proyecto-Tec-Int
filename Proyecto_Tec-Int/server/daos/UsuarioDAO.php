<?php
require_once ('../config/ConnectionDB.php');
require_once ('../model/Usuario.php');

class UsuarioDAO {
   
   private $connectionDB;
   private $dbCon;
   const CONSULTA = "SELECT NombreApellido, Correo, Contrasena, idUsuario FROM usuario";
   const INSERT = "INSERT INTO usuario (NombreApellido,Contrasena,Correo) VALUES (?,?,?)";
   
   public function __construct() {
     $this->connectionDB = new connectionDB();
     $this->dbCon = $this->connectionDB->getConnection();
   }

   public function readAll() {
      try {
         $statement = $this->dbCon->prepare(self::CONSULTA);
         $statement->execute();
         $cancion = $statement->fetchAll(PDO::FETCH_ASSOC);
			
      }catch(PDOException $ex){
         echo $ex->getMessage();
         die($ex->getMessage());
      }
      return $cancion;
      $this->connectionDB.close();
   }

   public function create(Usuario $user){
      $result=false;
      try {
         $statement = $this->dbCon->prepare(self::INSERT);
         $statement->execute([$user->NombreApellido, $user->Contrasena, $user->Correo ]);
         $result=true;
      }catch(PDOException $ex){
         echo $ex->getMessage();
         die($ex->getMessage());
      }
      return $result;
   }

}
?>