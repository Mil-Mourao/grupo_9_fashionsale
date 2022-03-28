const id = id => document.getElementById(id);

window.addEventListener('load', ()=>{

const allInputs = document.querySelectorAll('input')

let inputName = id('name');
let inputPrice = id('price');
let inputSizes = document.getElementsByName('units');
let inputFile = id('image');
let inputRadio = document.getElementsByName('category');
let inputOfert = id('ofert');
let inputDiscount = id('discount');
let error = false;

inputName.addEventListener('blur', () =>{
    if(inputName.value.trim() == ""){
        inputName.placeholder = "Este campo no debe quedar vacío";
        inputName.classList.add('is-invalid');
        error = true;
    }else if(inputName.value.length < 5){
        inputName.title = "El nombre al menos debe contener 5 letras";
        inputName.classList.add('is-invalid');
        error = true;
    }else{
        inputName.classList.remove('is-invalid');
        inputName.classList.add('is-valid');
    }
})
    
   



})