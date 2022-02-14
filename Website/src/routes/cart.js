const {Router} = require('express')
const {cart} = require('../controllers/cart')
const access = require('../middlewares/access')
const router = Router()

router.get('/productCart', [access], cart)

module.exports = router