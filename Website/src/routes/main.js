const {Router} = require('express');
const {index} = require('../controllers/main');
const router = Router();

router.get("/", index)

router.get("/about", about)

router.get("/cart", cart)

module.exports = router;