const express = require("express");
const users = require("../controllers/users");
const router = express.Router();
const userModel = require("../models/user");
const login = require('../middlewares/login');
const access = require('../middlewares/access')


router.get("/login", users.login);
router.get("/register", users.register);
router.get("/profile", [access],users.profile);

router.post("/save", users.save);
router.post("/access",[login], users.access);
router.post("/logout",users.logout);

module.exports = router;
