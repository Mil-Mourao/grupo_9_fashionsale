const {Router} = require('express')
const {cart} = require('../controllers/cart')
const router = Router()

router.get('/productCart', cart)

module.exports = router