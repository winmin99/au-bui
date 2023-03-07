const express = require("express");
const authMiddleware = require("../middlewares/auth-middleware");
const router = express.Router();
const BuffetController = require("../controller/buffet.controller");
const buffetController = new BuffetController();

//get
router.get("/buffets", buffetController.allBuffetsList);

module.exports = router;
