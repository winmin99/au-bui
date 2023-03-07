const express = require("express");
const router = express.Router();
const UserController = require("../controller/user.controller");
const userController = new UserController(); 

//signup
router.post("/signup", userController.signup);
router.post("login", userController.login);

module.exports = router;
