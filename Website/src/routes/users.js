const express = require("express");
const users = require("../controllers/users");
const router = express.Router();
const login = require('../middlewares/login');
const save = require('../middlewares/userRegisterValid')
const access = require('../middlewares/access')
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, path.resolve(__dirname, '../../public/img/Usuarios')),
    filename: (req, file, cb) => cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
})

const upload = multer({storage});

router.get("/login", users.login);
router.get("/register", users.register);
router.get("/profile", [access],users.profile);
router.get("/updateProfile", [access],users.updateProfile);

router.post("/save",[save], users.save);
router.post("/access", [login], users.access);
router.post("/logout",users.logout);

router.put("/profile",[upload.single('avatar')], users.uploadAvatar)

module.exports = router;
