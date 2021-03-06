const express = require("express");
const users = require("../controllers/users");
const router = express.Router();
const login = require('../middlewares/login');
const save = require('../middlewares/userRegisterValid')
const upload = require('../middlewares/uploadUserImg')
const access = require('../middlewares/access')

router.get("/login", users.login);
router.get("/register", users.register);
router.get("/profile", [access],users.profile);
router.get("/updateProfile", [access],users.updateProfile);

router.post("/save",[save], users.save);
router.put('/edit', users.editProfile);
router.post("/access", [login], users.access);
router.post("/logout",users.logout);

router.put("/profile",upload.single('avatar'), users.uploadAvatar)

module.exports = router;
