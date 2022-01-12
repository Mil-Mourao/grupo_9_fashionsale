const {Router} = require('express');
const {index,about,cart} = require('../controllers/main');
const router = Router();

router.get("/", index)

router.get("/about", about)

router.get("/productCart", cart)

module.exports = router;