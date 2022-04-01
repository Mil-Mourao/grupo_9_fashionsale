const {Router} = require('express');
const router = Router();
const {listAll, listOne} = require('../controllers/api/user');

router.get('/users', listAll);
//router.get('/users/:id', listOne);


module.exports = router;