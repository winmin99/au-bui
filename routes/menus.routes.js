const express = require("express");
const router = express.Router();
const MenuController = require("../controller/menu.controller")
const menuController = new MenuController();

//메뉴 조회
router.get("/:buffet_id", menuController.getAllMenu);

module.exports = router;
