const validator = require('express-validator');
//const user = require('../models/user');
const bcrypt = require('bcrypt');
const db = require('../database/models');

const validations = [
    validator.body('email').isEmail().withMessage('Email invalid').custom((value, {req}) => {
    return db.User.findOne(
        {where: {email: value}
    })
    .then(user => {
        if(!user || !bcrypt.compareSync(req.body.password, user.password)) return Promise.reject();
    })
    .catch(() => Promise.reject("Email/Contraseña incorrectos"))
    })
] 
module.exports = validations;

/*
let search = user.search('email', req.body.email);
        return search && search.password == value ? Promise.resolve() : Promise.reject('Password invalid');
*/