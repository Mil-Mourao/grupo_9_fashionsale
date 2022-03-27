window.addEventListener('load', () => {
    let button = document.querySelector("#login-button");
    let form = document.querySelector("#login-form");
    let email = document.querySelector("#email");
    let password = document.querySelector("#pass");
    let errorsList = document.querySelector("#errorsList")

    const regExEmail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}.){1,125}[A-Z]{2,63}$/i
    const regex = /^.*(?=.{6,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&?@"]).*$/
    email.focus();

    let errores = [];
    errorsList.innerText = "";

    email.addEventListener('blur', () =>{
        if(email.value == ""){
            email.classList.add('is-invalid');
            error = true;
           
        }else if(!regExEmail.test(email.value)){
            email.classList.add('is-invalid');
            error = true;
        }else{
            email.classList.remove('is-invalid');
            email.classList.add('is-valid');
        }

    })

    password.addEventListener('blur', ()=> {
        if (password.value == "") {
            password.classList.add('is-invalid');
            error = true;
        }else if(!regex.test(password.value)){
            Swal.fire({
                icon: 'error',
                title: 'Oops....',
                text: 'Recuerda que la contraseña debe contar con una mayúscula, un caracter especial y un número.',
                showConfirmButton: true
            })
            password.classList.add('is-invalid');
            error = true;
        }else{
            password.classList.remove('is-invalid');
            password.classList.add('is-valid');
        }   
        
    })
    
    form.addEventListener('submit', (e) => {
      let error = false;
        errores = [];
        errorsList.innerText = "";
            if(email.value == ""){
                email.classList.add('is-invalid');
                errores.push("Por favor completá tu email!");
                error = true;
               
            }else if(!regExEmail.test(email.value)){
                errores.push("Por favor ingresá un email válido!");
                email.classList.add('is-invalid');
                error = true;
            }else{
                email.classList.remove('is-invalid');
                email.classList.add('is-valid');
            }
    
            if (password.value == "") {
                errores.push("Por favor completá tu contraseña!");
                password.classList.add('is-invalid');
                error = true;
            }else if(!regex.test(password.value)){
                errores.push("Por favor ingresá una contraseña válida");
                password.classList.add('is-invalid');
                error = true;
            }else{
                password.classList.remove('is-invalid');
                password.classList.add('is-valid');
            }   
                 
    if(error) {
        e.preventDefault();
        errores.forEach(error => errorsList.innerHTML += `${error}<br>`);
    }else {
        e.preventDefault()
        Swal.fire({
            icon: 'success',
            title: 'Te has logueado con éxito',
            showConfirmButton: false
        })
        
        setTimeout(() => {
            form.submit()
        }, 1000);
    }
   
})
    
 
})