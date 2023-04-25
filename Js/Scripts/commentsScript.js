
window.onload = start();

function start(){
    const inputNombre = document.getElementById('inputNombre');
    const inputEmail = document.getElementById('inputEmail');
    const inputTitulo = document.getElementById('inputTitulo');
    const inputValoracion = document.getElementById('inputValoracion');
    const inputOpinion = document.getElementById('inputOpinion');

    const tituloPreview = document.getElementById('tituloPreview');
    const valoracionPreview = document.getElementById('valoracionPreview');
    const opinionPreview = document.getElementById('opinionPreview');

    const submitBtn = document.getElementById('submitBtn');

    inputTitulo.onkeyup = ()=>{
        tituloPreview.innerHTML = inputTitulo.value;
    }
    inputValoracion.onkeyup = ()=>{
        if(inputValoracion.value>5){
            swal('Error','Valoracion debe ser de 0 a 5, aceptando decimales','error');
            inputValoracion.value = '';
            valoracionPreview.innerHTML = '0.0/5';
        }else{
            valoracionPreview.innerHTML = `${(inputValoracion.value).toString()}/5`;
        }
    }
    inputOpinion.onkeyup = ()=>{
        opinionPreview.innerHTML = inputOpinion.value;
    }

    submitBtn.onclick = ()=>{
        let name = inputNombre.value;
        //Separa el nombre en un arreglo y obtiene la primer palabra, osea el nombre principal
        name = (name.split(' '))[0]; 
        const email = inputEmail.value;
        const titulo = inputTitulo.value;
        const valoracion = inputValoracion.value;
        const opinion = inputOpinion.value;
        if(name && email && titulo && valoracion && opinion){ //Comprueba que no haya campos vacios
            swal(`Gracias por su opinion ${name}`,'Los comentarios nos ayudan a mejorarnos y reinventarnos, gracias por aportar tu opinion','success');

            //Selecciono todos los inputs y los seteo vacios
            document.querySelectorAll('input').forEach((input) => { 
                input.value = '';
            });
            inputOpinion.value = '';

            //Seteo la preview de la opinion a su valor default
            tituloPreview.innerHTML = 'Titulo';
            valoracionPreview.innerHTML = '0.0/5';
            opinionPreview.innerHTML = 'Opinion desarrollada';
        }else{
            swal('Campos Vacios','Compruebe que lleno todos los campos e intente nuevamente','error')
        }
    }
}