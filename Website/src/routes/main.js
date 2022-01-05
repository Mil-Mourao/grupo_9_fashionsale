const {Router} = require('express');
const {index,about,carrito} = require('../controllers/main');
const router = Router();

router.get("/", index)

router.get("/about", about)

router.get("/carrito", carrito)

module.exports = router;