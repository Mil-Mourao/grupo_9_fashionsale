const path = require('path')
const controller = {
    login: (req,res) => res.render('users/login', {styles:['login'], title: "Log in"}),
    register: (req,res) => res.render('users/register', {styles:['register'], title: "Registro"})
    }

module.exports = controller