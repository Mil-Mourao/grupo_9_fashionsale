const validator = require('express-validator');
const user = require('../models/user');
const validations = [
    validator.body('email').isEmail().withMessage('Email invalid').custom(value => {
        let search = user.search('email', value);
        return search ? Promise.reject('Email used') : Promise.resolve();
    }),
    validator.body('password').isLength({min: 6}).withMessage('Mínimo 6 caracteres').matches(/^.*(?=.{6,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&?@ "]).*$/).withMessage('Mínimo 6 caracteres, 1 letra, 1 número e 1 caracter especial')
]

// 

module.exports = validations;