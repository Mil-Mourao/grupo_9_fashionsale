const validator = require('express-validator');
//const user = require('../models/user');
const db = require('../database/models');

const validations = [
    validator.body('email').isEmail().withMessage('Email invalid').custom(value => {
     return db.User.findOne({
          where: {email: value}
     })
          .then(user => {
               if(user) return Promise.reject('Ese email ya se encuentra en nuestro sistema.')
          })
    }),
    validator.body('password').isLength({min: 6}).withMessage('La contraseña debe contener al menos 6 caracteres')
    .matches(/^.*(?=.{6,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&?@"]).*$/).withMessage("La contraseña debe contener:<br/>1 letra Mayúscula, <br/>1 número, <br/>1 caracter especial por ejemplo (!#$%&?@).")
]

module.exports = validations;


//let search = user.search('email', value);