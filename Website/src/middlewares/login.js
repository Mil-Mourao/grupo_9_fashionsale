const validator = require('express-validator');
const user = require('../models/user');
const bcrypt = require('bcrypt');

const validations = [
    validator.body('email').isEmail().withMessage('Email invalid').custom(value => {
        let search = user.search('email', value);
        return search ? Promise.resolve() : Promise.reject('Email not registered');
    }),
    validator.body('password').isLength({min: 6})
    .withMessage('Mínimo 6 caracteres')
    .matches(/^.*(?=.{6,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*$/)
    .withMessage('Mínimo 6 caracteres, 1 letra, 1 número e 1 character especial')
    .custom((value,{req}) => {
        let search = user.search('email', req.body.email);
        return bcrypt.compareSync(value, search.password)
        ? Promise.resolve()
        : Promise.reject('Password invalid');
    })
]

module.exports = validations;

/*
let search = user.search('email', req.body.email);
        return search && search.password == value ? Promise.resolve() : Promise.reject('Password invalid');
*/