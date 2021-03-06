const {body, check} = require('express-validator');



module.exports = [
    
    check('name')
    .notEmpty().withMessage('Campo nombre obligatorio')
    .isString().withMessage('Ingrese un nombre válido')
    .isLength({min: 5}).withMessage('El nombre debe tener al menos 5 caracteres'),

    check('price')
    .notEmpty().withMessage('Campo precio obligatorio')
    .isNumeric().withMessage('Ingrese solamente números'),

    check('image')
    .custom((value, {req}) => {
        if(req.files.length > 0){
            return Promise.resolve();
        }else{
            return Promise.reject();
        }
    }).withMessage('Ingresa al menos una imagen') 
]