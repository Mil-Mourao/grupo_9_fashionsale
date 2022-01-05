const express = require('express');
const products = require('../controllers/products');
const router = express.Router();

router.get("/", products.list);

router.get('/create', products.create);

router.get('/:id', products.detail);

router.get('/modify/:id ', products.modify);


module.exports = router;