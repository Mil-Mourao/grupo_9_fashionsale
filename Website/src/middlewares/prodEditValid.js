const {body, check} = require('express-validator');

module.exports = [
    
    check('name')
    .notEmpty().withMessage('Campo nombre obligatorio')
    .isString().withMessage('Ingrese un nombre válido')
    .isLength({min: 5}).withMessage('El nombre debe tener al menos 5 caracteres'),

    check('price')
    .notEmpty().withMessage('Campo precio obligatorio')
    .isNumeric().withMessage('Ingrese solamente números'),

    check('description')
    .isLength({min: 20}).withMessage('Ingresa una descripción que contenga al menos 20 caracteres'),
]