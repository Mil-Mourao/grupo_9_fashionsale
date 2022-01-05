const path = require('path')
const controller = {
    login: (req,res) => res.render('users/login', {css:'login'}),
    register: (req,res) => res.render('users/register', {css:'register'})
    }

module.exports = controller