const {body, check} = require('express-validator');

module.exports = [
    
    check('name')
    .notEmpty().withMessage('Campo nombre obligatorio')
    .isString().withMessage('Ingrese un nombre válido')
    .isLength({min: 5}).withMessage('El nombre debe tener al menos 5 letras'),

    check('price')
    .notEmpty().withMessage('Campo precio obligatorio')
    .isNumeric().withMessage('Ingrese solamente números'),


]