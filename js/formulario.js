const formulario = document.getElementById('form'); //hasta 49:25
const inputs = document.querySelectorAll('#form input');
const expresiones = {	
    usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo	
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.	
    password: /^.{4,12}$/, // 4 a 12 digitos.	
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,	
    telefono: /^\d{7,14}$/ // 7 a 14 numeros.
}

const campos = {	
    usuario: false,	
    nombre: false,	
    password: false,	
    correo: false,	
    telefono: false
}

const validarFormulario = (e) => {	//fx arrow, para acceder a los names de cada input
    switch (e.target.name) {	//en el caso de que el nombre del input sea usaurio, ejecute x codigo
    	case "usuario":			
        validarCampo(expresiones.usuario, e.target, 'usuario');	//comprueba que lo que ingresó el usuario coincida con la expresión regular de la parte superior	
        break;		
        case "nombre":			
        validarCampo(expresiones.nombre, e.target, 'nombre');		
        break;		
        case "password":			
        validarCampo(expresiones.password, e.target, 'password');			
        validarPassword2();		
        break;		
        case "password2":			
        validarPassword2();		
        break;		
        case "correo":			
        validarCampo(expresiones.correo, e.target, 'correo');		
        break;		
        case "telefono":			
        validarCampo(expresiones.telefono, e.target, 'telefono');		
        break;
    	}
    }


 //expresion: expresion que queremos utilizar para validar el campo. input: es el elemento e.target. Luego el campo puede ser usuario, nombre, etc...       
const validarCampo = (expresion, input, campo) => {	//esto podría haber ido en cada case, pero para optimizar se abstrae en la fx a parte para no repetir el codigo por campo
    if(expresion.test(input.value)){	//validamos usuario / nombre y correo
        document.getElementById(`group-${campo}`).classList.remove('form-group-wrong');	//template string para tomar el valor que le pasemos a la variable para reutilizar en cada campo.	
        document.getElementById(`group-${campo}`).classList.add('form-group-right');		
        document.querySelector(`#group-${campo} i`).classList.add('fa-circle-check');		
        document.querySelector(`#group-${campo} i`).classList.remove('fa-circle-xmark');		
        document.querySelector(`#group-${campo} .input-error-form`).classList.remove('input-error-form-activo');		
        campos[campo] = true;	//a los efectos de que todos los campos esten cargados
    } else {		
        document.getElementById(`group-${campo}`).classList.add('form-group-wrong');//Cuando el campo es incorrecto queremos que nos agregue la clase wrong		
        document.getElementById(`group-${campo}`).classList.remove('form-group-right');// y elimine la clase right		
        document.querySelector(`#group-${campo} i`).classList.add('fa-circle-xmark');//y a su vez cambie el icono agregando x 		
        document.querySelector(`#group-${campo} i`).classList.remove('fa-circle-check');//y quitando el correct check		
        document.querySelector(`#group-${campo} .input-error-form`).classList.add('input-error-form-activo');//al agregar esta clase habilitamos el display del párrafo con el mensaje de error con display block		
        campos[campo] = false;
    	}
    }
const validarPassword2 = () => {	
    const inputPassword1 = document.getElementById('password');	
    const inputPassword2 = document.getElementById('password2');	
    
    if(inputPassword1.value !== inputPassword2.value){		
        document.getElementById(`group-password2`).classList.add('form-group-wrong');		
        document.getElementById(`group-password2`).classList.remove('form-group-right');		
        document.querySelector(`#group-password2 i`).classList.add('fa-circle-xmark');		
        document.querySelector(`#group-password2 i`).classList.remove('fa-circle-check');		
        document.querySelector(`#group-password2 .input-error-form`).classList.add('input-error-form-activo');		
        campos['password'] = false;	
    } 
    else {		
            document.getElementById(`group-password2`).classList.remove('form-group-wrong');		
            document.getElementById(`group-password2`).classList.add('form-group-right');		
            document.querySelector(`#group-password2 i`).classList.remove('fa-circle-xmark');		
            document.querySelector(`#group-password2 i`).classList.add('fa-circle-check');		
            document.querySelector(`#group-password2 .input-error-form`).classList.remove('input-error-form-activo');		
            campos['password'] = true;
        	}
        }
        
inputs.forEach((input) => {	//fx arrow que se ejecutará por cada input
    input.addEventListener('keyup', validarFormulario);	//por cada input agrega un event listener. Cuando el usuario presiona una tecla, cuando se suelta la tecla, se ejecuta la fx validarFormulario
    input.addEventListener('blur', validarFormulario);//cuando le den un click fuera del input tmb se ejecutará esa fx
});

form.addEventListener('submit', (e) => {//fx flecha para click en submit
    	e.preventDefault();//este método es a los efectos de que no suceda nada, dado que no estamos trabajando con DB aún.
        
    const terminos = document.getElementById('terminos');	
    if(campos.usuario && campos.nombre && campos.password && campos.correo && campos.telefono && terminos.checked ){		
        formulario.reset();		//validación de términos
        
        document.getElementById('success-message-form').classList.add('success-message-form-activo');		
        setTimeout(() => {			
            document.getElementById('success-message-form').classList.remove('success-message-form-activo');		
        }, 5000);	//El mensaje de envío exitoso se va luego de 5 segundos	
        
        document.querySelectorAll('.form-group-right').forEach((icono) => {
            icono.classList.remove('form-group-right');		
        });	//tambien desaparecen de pantalla todos los iconos verdes right
    } else {	
        	document.getElementById('form-message').classList.add('form-message-activo');
        	}
        });


  