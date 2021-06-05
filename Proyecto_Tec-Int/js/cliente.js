//Mi JavaScript
var us = 0; 
var nombre;
var viaje;
//Verificación de Inicio de Sesión
$(document).ready(function(){
	$("#InicioForm").submit(function(event){
		console.log("entro el evento botón - iniciar sesión");
		event.preventDefault();
		var correo = document.getElementById("Usuario-1").value;
		var password = document.getElementById("Contrasena-1").value;
		submitConsulta(correo,password);
	});
});
//listas
$(document).ready(function(){
	var contador = 0;
	var destino;
	var fecha;
	var element = [];
	$('#validationCustom01').on('click',function() {
		console.log($(this).val());
		destino = $(this).val();
	});
	$('#validationCustom02').on('click',function() {
		console.log($(this).val());
		fecha = $(this).val();
	});
	$('#Ayuda-tab').on('click',function() {
		datosConsulta(destino,fecha);
	});
});

//Viaje
function datosConsulta(Destino, Fecha){
	console.log('Entro');
	fetch('http://localhost/Proyecto_Tec-Int/server/business/ViajeConsulta.php',{
	method:	'GET',
	headers:{
		'Content-Type' : 'application/json'
	}
	}).then(response => response.json())
		.then(result => {
			if (result.length > 0) {
				cargarDatos(result, Destino, Fecha);
			} else {
				console.log(JSON.stringify(result));
			}
	}).catch(error => console.log('Error: ' + error));
}
//Viaje
function Datos(data, Destino, Fecha){
	console.log('Destino:' + Destino);
	console.log('Fecha:' + Fecha);
	$("#dataInfo tr").remove();
	for(var i = 0; i < data.length; i++){
		if(Destino == data[i].Destino && Fecha == data[i].Fecha){
			viaje = data[i].idViaje;
			console.log("Si");
			$("#dataInfo").append(`<h4 class=" text-center d-flex flex-column justify-content-center" id="dataInfo">Destino: ${data[i].Destino}</h4>
			<br>
			<h4 class=" text-center d-flex flex-column justify-content-center" id="dataInfo">Fecha de viaje: ${data[i].Fecha}</h4>`);
		}
	}	
}


//Consulta usuario 
function submitConsulta(email,pass){
	var b = 0;
	console.log("Entró a llamar");
	fetch('http://localhost/Proyecto_Tec-Int/server/business/UsuarioConsulta.php',{
	method:	'GET',
	headers:{
		'Content-Type' : 'application/json'
	}
	}).then(response => response.json())
        .then(result => {
            if (result.length > 0) {
				for (var i=0; i<result.length; i++){
					if(email == result[i].Correo){
						b = 1;
						if(b == 1){
							if(pass == result[i].Contrasena){
								b = 2;
								us = result[i].idUsuario;
								nombre = result[i].Nombre;
							}
						}
					}
				}
				ayuda(b);
            } else {
				console.log("Error");
            }
        })
        .catch(error => console.log('error: ' + error));
	return b;
}

//Función para generar mensajes emergentes
function ayuda(flag){
	if(flag == 0){
		var respuesta = document.getElementById('alerta2');
		respuesta.innerHTML = `<div class="alert alert-danger" role="alert">
		Usuario Incorrecto / Usuario no registrado.
		  </div>`
	}
	if(flag == 1){
		var respuesta = document.getElementById('alerta2');
		respuesta.innerHTML = `<div class="alert alert-danger" role="alert">
		Contraseña Incorrecta.
		  </div>`
	}
	if(flag == 2){
		var respuesta = document.getElementById('alerta2');
		respuesta.innerHTML = `<div class="alert alert-success" role="alert">
		Bienvenido
		  </div>`;
		var respuesta3 = document.getElementById('Hello3');
		var respuesta4 = document.getElementById('Hello4');
		respuesta0.innerHTML = "Bienvenido: " + nombre;
		respuesta1.innerHTML = ` <a class="btn btn-light m-3" 
		<button class="btn btn-warning" id="Inicio-tab" data-toggle="tab" href="#Continuar" role="tab" type="submit" href="#Continuar" aria-selected="false">Consultar ruta</a>`
		console.log(us);
		console.log(nombre);
		respuesta3.innerHTML = ` <a class="btn btn-light m-3" 
		<button class="btn btn-warning" id="Inicio-tab" data-toggle="tab" role="tab" type="submit" aria-selected="false" href="#Inicio" onclick="cerrarSesion()"> Cerrar Sesión </a>`;
		respuesta4.innerHTML = " ";
	}
}

function cerrarSesion(){
	
	var respuesta3 = document.getElementById('Hello3');
	var respuesta4 = document.getElementById('Hello4');
	
	respuesta3.innerHTML = `<a class="btn btn-light m-3" id="Inicio-tab" data-toggle="tab" href="#Inicio" role="tab"
	aria-selected="false">Inicio</a>`;
	respuesta4.innerHTML = `<a class="btn btn-light m-3" id="home-tab" data-toggle="tab" href="#Table" role="tab"
	aria-controls="home" aria-selected="false">Iniciar Sesión</a>`;
	
	us = 0;
	nombre = null;
	console.log(us);
}
//Insertar Usuario

$(document).ready(function(){ 
	$("#RegistroForm").submit(function(event){
		console.log("si");
		event.preventDefault();
		var pass1 = document.getElementById("Contrasena").value;
		var pass2 = document.getElementById("Contrasena2").value;
		if(pass1 == pass2 ){
			submitFormInsert();
		}else{
			var respuesta = document.getElementById('alerta');
			respuesta.innerHTML = `<div class="alert alert-danger" role="alert">
			Las contraseñas no coinciden.
		  	</div>`	
		}
		
	});
});

//Enviar datos a la base de datos
function submitFormInsert(){
	
	var Nombre = $("#Usuario").val();
    var Email = $("#Email").val();
    var Contrasena = $("#Contrasena").val();

    var object = {"NombreApellido":Nombre,"Contrasena":Contrasena,"Correo":Email};
	
    console.log(object);

	fetch('http://localhost/Proyecto_Tec-Int/server/business/UsuarioInsert.php',{
	method:	'POST',
	headers:{
		'Content-Type' : 'application/json'
	},
	body: JSON.stringify(object),
	cache: 'no-cache'
	
	})
	.then(function(response){
		console.log("si");
		return response.text();
	})
	.then(function(data){
		if(data === " 1"){
			var respuesta = document.getElementById('alerta');
			respuesta.innerHTML = `<div class="alert alert-success" role="alert">
			Se ha registrado correctamente
		  	</div>`
        }
        else{
            alert("Error");
        }
	})
	.catch(function(err){
		console.error(err);
	});
}