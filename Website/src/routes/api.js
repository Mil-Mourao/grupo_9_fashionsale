const {Router} = require('express');
const router = Router();
const apiUser = require('../controllers/api/user');
const apiProduct = require('../controllers/api/product');

// rutas User
router.get('/users', apiUser.listAll);
router.get('/users/lastOne', apiUser.lastUser);
router.get('/users/:id', apiUser.listOne);



// rutas Products
router.get('/products', apiProduct.listAll);
router.get('/products/lastOne', apiProduct.lastProduct);
router.get('/products/:id', apiProduct.listOne);

module.exports = router;