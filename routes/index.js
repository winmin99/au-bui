const express = require("express");
const router = express.Router();

const buffetsRouter = require("./buffets.routes.js");
const menusRouter = require("./menus.routes.js");
const reviewsRouter = require("./reviews.routes.js");
const usersRouter = require("./users.routes.js");

router.use("/buffets", buffetsRouter);
router.use("/menus", menusRouter);
router.use("/reviews", reviewsRouter);
router.use("/users", usersRouter);

module.exports = router;
