const express = require('express');
const products = require('../controllers/products');
const router = express.Router();
const path = require('path');
const access = require('../middlewares/access');
<<<<<<< HEAD
const multer = require('multer');
const upload = multer({storage: multer.diskStorage({
    destination: (req, file, cb) => cb(null,path.resolve(__dirname, '../../public/img/Productos')),
    filename: (req,file,cb) => cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)),
})})
=======
const upload = require('../middlewares/uploadProductImg');
const save = require('../middlewares/prodCreateValid');
>>>>>>> 0e1babc649a6f065aded21f36a24edd866387470

router.get("/", products.list);
router.get('/create', [access], products.create);
router.get('/:id', products.detail);
router.get("/update/:id", [access], products.update);

router.put('/:id', [upload.any()],products.modify);

router.post('/', [upload.any()], save, products.save)

router.delete('/', products.delete)

module.exports = router;