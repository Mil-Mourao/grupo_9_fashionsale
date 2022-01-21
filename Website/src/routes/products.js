const express = require('express');
const products = require('../controllers/products');
const files = require('../controllers/files');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const upload = multer({storage: multer.diskStorage({
    destination: (req, file, cb) => cb(null,path.resolve(__dirname, '../../public/img/Productos')),
    filename: (req,file,cb) => cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)),
})})

router.get("/", products.list);
router.get('/create', products.create);
router.get('/:id', products.detail);
router.get("/update/:id", products.update);

router.put('/:id', products.modify);

router.post('/', [upload.any()],products.save)

router.delete('/', products.delete)

module.exports = router;