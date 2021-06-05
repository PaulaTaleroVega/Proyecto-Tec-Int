<?php
require_once ('../config/ConnectionDB.php');
require_once ('../model/Ruta.php');

class UsuarioDAO {
   
   private $connectionDB;
   private $dbCon;
   const CONSULTA = "SELECT Horarios, Cordenadas, CiudadDestino, CiudadOrigen, Tiempo, Distancia, Mapa, idRuta FROM ruta";
   const INSERT = "INSERT INTO Ruta (Nombre, Horarios, Cordenadas, CiudadDestino, CiudadOrigen, Tiempo, Distancia, Mapa) VALUES (?,?,?,?,?,?,?,?)";
   
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
   public function create(Ruta $ruta){
    $result=false;
    try {
       $statement = $this->dbCon->prepare(self::INSERT);
       $statement->execute([$ruta->Nombre, $ruta->Horarios, $ruta->Cordenadas, $ruta->CiudadDestino, $ruta->CiudadOrigen, $ruta->Tiempo, $ruta->Distancia, $ruta->Mapa]);
       $result=true;
    }catch(PDOException $ex){
       echo $ex->getMessage();
       die($ex->getMessage());
    }
    return $result;
 }

}
?>