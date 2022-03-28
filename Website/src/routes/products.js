const express = require('express');
const products = require('../controllers/products');
const router = express.Router();
const access = require('../middlewares/access');
const upload = require('../middlewares/uploadProductImg');

router.get("/", products.list);
router.get('/create', products.create);
router.get('/:id', products.detail);
router.get("/update/:id", products.update);

router.put('/:id', [upload.any()],products.modify);

router.post('/', [upload.any()],products.save)

router.delete('/', products.delete)

module.exports = router;