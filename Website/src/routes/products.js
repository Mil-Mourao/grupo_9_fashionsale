const express = require('express');
const users = require('../controllers/users');
const router = express.Router();

router.get('/', users.login)
router.get('/register', users.register)

module.exports = router;