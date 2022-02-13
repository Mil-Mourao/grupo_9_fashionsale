const validator = require('express-validator');
const user = require('../models/user');
const validations = [
    validator.body('email').isEmail().withMessage('Email invalid').custom(value => {
        let search = user.search('email', value);
        return search ? Promise.reject('Ese email ya se encuentra en nuestro sistema.') : Promise.resolve();
    }),
    validator.body('password').isLength({min: 6}).withMessage('Mínimo 6 caracteres').matches(/^.*(?=.{6,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&?@"]).*$/).withMessage("Mínimo debe contener 6 caracteres, <br/>1 letra Mayúscula, <br/>1 número, <br/>1 caracter especial por ejemplo (!#$%&?@).")
]

module.exports = validations;