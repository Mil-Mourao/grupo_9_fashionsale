const {Router} = require('express');
const {index,about, search} = require('../controllers/main');
const router = Router();


router.get("/", index)
router.get("/search", search)
router.get("/about", about)

module.exports = router;