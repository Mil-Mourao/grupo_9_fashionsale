const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, path.resolve(__dirname, '../../public/img/Usuarios')),
    filename: (req, file, cb) => cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
});

const fileFilter = (req, file, cb) => {
    let extensiones = ['.jpg', '.png', '.gif', '.jpeg'];
    let extName = path.extname(file.originalname);
    if(!extensiones.includes(extName)){
        cb(`Error: las extenciones permitidas son: ${extensiones.join('|')}`);
    }else{
        cb(null, true);
    }
}

module.exports = multer({storage, fileFilter});