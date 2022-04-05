window.addEventListener("load", function () {
    let formulario = document.querySelector("#form")

    const regex = /^.*(?=.{6,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&?@"]).*$/
    const regExEmail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}.){1,125}[A-Z]{2,63}$/i
    let errors = []

    formulario.addEventListener('submit', (e) => {
        e.preventDefault();
        let errorsList = document.querySelector("#errorsList")
        errorsList.innerText = "";
    let inputName = document.querySelector("#name")
    
    if (inputName.value == "") {
        errors.push("Por favor completá tu nombre!")
    } else if (inputName.value.length < 2) {
        errors.push("Tu nombre tiene que tener al menos 2 caractéres!")
    }

    let lastName = document.querySelector("#lastName")
    if (lastName.value == "") {
        errors.push("Por favor completá tu apellido!")
    } else if (lastName.value.length < 2) {
        errors.push("Tu apellido tiene que tener al menos 2 caractéres!")
    }

    let email = document.querySelector("#email")
    if (email.value == "") {
        errors.push("Por favor completá tu email!")
    } else if (!regExEmail.test(email.value)) {
        errors.push("Por favor ingresá un email válido!")
    }

    let password = document.querySelector("#password")
    if (password.value == "") {
        errors.push("Por favor completá tu contraseña!")
    } else if (password.value.length < 8) {
        errors.push("Tu contraseña tiene que tener al menos 8 caractéres!")
    } else if (!regex.test(password.value)) {
        errors.push("La contraseña debe contener una mayúscula, una minúscula, un símbolo, un número y un carácter especial")
    }
        if (errors.length > 0) {
            e.preventDefault();
            for (let i = 0; i < errors.length; i++) {
                errorsList.innerHTML += "<li>" + errors[i] + "</li>"
            }
            errors = [];
        }else{
            e.preventDefault()
        Swal.fire({
            icon: 'success',
            title: 'Te has registrado con éxito en Fashion Sale, a continuación serás redirigido al login.',
            showConfirmButton: false
        })
        setTimeout(() => {
            formulario.submit()
        }, 1000);
        }
    })
})
    
