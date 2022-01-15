const express = require('express');
const products = require('../controllers/products');
const router = express.Router();

router.get("/", products.list);

router.get('/create', products.create);

router.post("/", products.save);
router.get("/update/:id", products.update);
router.put('/modify/:id ', products.modify);
router.get('/:id', products.detail);




module.exports = router;