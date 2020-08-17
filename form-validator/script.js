const form = document.getElementById('form');
const usuario = document.getElementById('usuario');
const email = document.getElementById('email');
const contraseña = document.getElementById('contraseña');
const contraseña2 = document.getElementById('contraseña2');

//MOSTRAR MENSAJE DE ERROR
function mostrarError(input,mensage){
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = mensage;
    
}

//MOSTRAR BORDE VERDE
function mostrarValidez(input){
    const formControl = input.parentElement;
    formControl.className = 'form-control succes';
}

//CHECAR CAMPOS REQUERIDOS
function requerido(inputsArray){
    inputsArray.forEach( (input) => {
        input.value.trim() === '' ? mostrarError(input, `${firstLetterUp(input)} es requerido`) : mostrarValidez(input);
    });
}

//CHECAR TAMAÑO DE INPUT
function checarTamaño(input,min,max){
    if(input.value.length < min){
        mostrarError(input, `${firstLetterUp(input)} debe de tener al menos ${min} caracteres`);
    } else if(input.value.length > max){
        mostrarError(input, `${firstLetterUp(input)} debe de tener maximo ${max} caracteres`);
    }
}

//VALIDACION DE EMAIL
function checarEmail(input){
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(input.value.trim())){
        mostrarValidez(input);
    } else{
        mostrarError(input,'El correo no es valido');
    }
}

//CHECAR CONTRASEÑAS
function checarContraseñas(input1,input2){
    if(input1.value !== input2.value){
        mostrarError(input2, 'Las contraseñas deben de ser iguales');
    }
}
//PRIMERA LETRA MAYUSCULA
function firstLetterUp(input){
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// EVENT LISTENER
form.addEventListener('submit', function(e){
    e.preventDefault();

    requerido([usuario,email,contraseña,contraseña2]);
    checarTamaño(usuario, 3, 15);
    checarTamaño(contraseña, 6, 15);
    checarTamaño(contraseña2, 6, 15);
    checarEmail(email);
    checarContraseñas(contraseña,contraseña2);
});