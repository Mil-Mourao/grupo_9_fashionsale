const validator = require('express-validator');
const user = require('../models/user');
const bcrypt = require('bcrypt');

const validations = [
    validator.body('email').isEmail().withMessage('Email invalid').custom(value => {
        let search = user.search('email', value);
        return search ? Promise.resolve() : Promise.reject('Email not registered');
    }),
    validator.body('password').isLength({min: 6}).withMessage("Contraseña menor a 6 caracteres").custom((value,{req}) => {
        let search = user.search('email', req.body.email);
        return bcrypt.compareSync(value, search.password)
        ? Promise.resolve()
        : Promise.reject('Constraseña incorrecta');
    })
] 
module.exports = validations;

/*
let search = user.search('email', req.body.email);
        return search && search.password == value ? Promise.resolve() : Promise.reject('Password invalid');
*/