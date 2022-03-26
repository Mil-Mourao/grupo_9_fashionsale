window.addEventListener("load", function () {
    console.log("according to all laws of aviation")
    let button = document.querySelector("#login-button")

    const regExEmail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}.){1,125}[A-Z]{2,63}$/i
    let errors = []

    let email = document.querySelector("#email")
    if (email.value == "") {
        errors.push("Por favor completá tu email!")
    } else if (!regExEmail.test(email.value)) {
        errors.push("Por favor ingresá un email válido!")
    }

    let password = document.querySelector("#pass")
    if (password.value == "") {
        errors.push("Por favor completá tu contraseña!")
    }

    button.addEventListener("click", function (e) {
        if (errors.length > 0) {
            e.preventDefault()
            let errorsList = document.querySelector("#errorsList")
            for (let i = 0; i < errors.length; i++) {
                errorsList.innerHTML += "<li>" + errors[i] + "</li>"
            }
        }
    })
})