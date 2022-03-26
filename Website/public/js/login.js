window.addEventListener("load", function () {
    console.log("according to all laws of aviation")
    let button = document.querySelector("#login-button")
    let form = document.querySelector("#login-form")
    const regExEmail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}.){1,125}[A-Z]{2,63}$/i
    let errors = []

    let email = document.querySelector("#email")
    if (email.value == "") {
        errors.push("Por favor completá tu email!")
        console.log("email")
    } else if (!regExEmail.test(email.value)) {
        errors.push("Por favor ingresá un email válido!")
    }

    let password = document.querySelector("#pass")
    password.addEventListener('blur', () =>{
        if (password.value == "") {
            errors.push("Por favor completá tu contraseña!")
            console.log("password")
        }
    })
    
    let errorsList = document.querySelector("#errorsList")
    button.addEventListener("click", function (e) {
        if (errors.length >= 1) {
            e.preventDefault()
            for (let i = 0; i < errors.length; i++) {
                
                errorsList.innerHTML = "<li>" + errors[i] + "</li>"
            }
            console.log(email.value + "  " + password.value);
        }
    })
})