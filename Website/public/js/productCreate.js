const id = id => document.getElementById(id);
let numbersRegex = /^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/;
let imageRegex = /([a-zA-Z0-9\s_\\.\-:])+(png|jpg|gif|jpeg)$/;
window.addEventListener('load', ()=>{

let formulario = id('form-create');

let inputName = id('name');
let inputPrice = id('price');
let inputSizes = document.getElementsByName('units');
let inputDescription = id('description');
let inputFile = id('image');
let inputRadio = document.getElementsByName('category');
let inputOfert = id('ofert');
let inputDiscount = id('discount');


inputName.addEventListener('blur', () =>{
    if(inputName.value.trim() == ""){
        inputName.placeholder = "Este campo no debe quedar vacío";
        inputName.classList.add('is-invalid');
    }else if(inputName.value.length < 5){
        inputName.placeholder = "El nombre al menos debe contener 5 letras";
        inputName.classList.add('is-invalid');
    }else{
        inputName.classList.remove('is-invalid');
        inputName.classList.add('is-valid');
    }
})

inputPrice.addEventListener('blur', ()=>{
    
    if(inputPrice.value.trim() == ""){
        inputPrice.placeholder = "Este campo no debe quedar vacío";
        inputPrice.classList.add('is-invalid');
    }else if(!numbersRegex.test(inputPrice.value)){
        Swal.fire({
            icon: 'question',
            title: 'Oops...',
            text: 'Escribir solamente números sin el uso de la coma (,) o el punto (.)',
            showConfirmButton: true,
        })
        inputPrice.classList.add('is-invalid');
    }else{
        inputPrice.classList.remove('is-invalid');
        inputPrice.classList.add('is-valid');
    }
})
let charCount;
inputDescription.addEventListener('keypress', (e) =>{

charCount += e.key;
    if(charCount.length < 20){
        inputDescription.classList.add('is-invalid');
    }else{
        inputDescription.classList.add('is-valid');
        inputDescription.classList.remove('is-invalid');
    }
})

inputDescription.addEventListener('blur', () =>{
    charCount= ""
        if(inputDescription.value == ""){
            inputDescription.classList.add('is-invalid');
            inputDescription.classList.remove('is-valid');
        }else{
            inputDescription.classList.add('is-valid');
            inputDescription.classList.remove('is-invalid');
        }
    })

inputFile.addEventListener('change', ()=>{
    let aux = 0;
    let pruebaImagen = inputFile.files;    
    for (let index = 0; index < pruebaImagen.length; index++) {
        if(!imageRegex.test(pruebaImagen[index].name)){
            aux++
        }   
    }
    if(aux > 0){
        Swal.fire({
            icon: 'error',
            title: 'Formato archivo erróneo',
            text: 'El/Los archivo(s) deben contar con alguna de siguientes extensiones .jpg, .png, .gif o .jpeg',
            showConfirmButton: true,
        })
    }
})

inputDiscount.addEventListener('change', ()=>{
    if(inputDiscount.value <= 0 || inputDiscount.value > 95){
        Swal.fire({
            icon: 'question',
            title: 'Error',
            text: 'Debes ingresar un valor entre 1 a 95',
            showConfirmButton: true,
        })
        inputDiscount.classList.remove('is-valid')
        inputDiscount.classList.add('is-invalid')
    }else{
        inputDiscount.classList.remove('is-invalid')
        inputDiscount.classList.add('is-valid')
    }
})

inputOfert.addEventListener('click', () =>{
    inputDiscount.classList.add('is-invalid')
})

inputSizes.forEach(e => {
    e.addEventListener('keyup', () => {
        if(!numbersRegex.test(e.value)){
                e.classList.add('is-invalid');
            }else{
                e.classList.remove('is-invalid');
                e.classList.add('is-valid');
            }
        })
})

inputSizes.forEach(e => {
    e.addEventListener('blur', () => {
        if(e.value == ""){
                e.classList.remove('is-invalid');
                e.classList.remove('is-valid');
            }
        })
})

formulario.addEventListener('submit', (e)=>{
    
    let controlSubmit = false;
    e.preventDefault();
    let inputsFormulario = formulario.elements
    
    if(inputName.value.trim() == ""){
        inputName.classList.add('is-invalid');
    }
    
    if(inputPrice.value.trim() == ""){
        inputPrice.classList.add('is-invalid');
    }

    
    let aux3 = 0;
    for (let index = 0; index < inputSizes.length; index++) {
        aux3 = aux3 + Number(inputSizes[index].value)
        if(index == inputSizes.length -1 && aux3 == 0){
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Debes completar al menos un campo con las unidades de un talle',
                showConfirmButton: true,
            })  
            return controlSubmit = true;
        }
        
    }

    if(inputOfert.checked && inputDiscount.value == ""){
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Agregar un número de descuento',
            showConfirmButton: true,
    })
    controlSubmit = true;
    }


    if(!inputsFormulario[14].value){
        Swal.fire({
            icon: 'question',
            title: 'Imagen',
            text: 'Ingresa al menos una imagen del producto',
            showConfirmButton: true,
        })
        controlSubmit = true;
    }

    for (let index = 0; index < inputsFormulario.length; index++) {
        if(inputsFormulario[index].classList.contains('is-invalid')){
            controlSubmit = true;
        }
    }


    if(!controlSubmit){

        e.preventDefault();
        Swal.fire({
            icon: 'success',
            title: 'Tu producto se ha creado con éxito',
            showConfirmButton: false
        })
        setTimeout(() =>{
            formulario.submit();
        },1000);
    }
})
   

})