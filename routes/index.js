const express = require("express");
const router = express.Router();

const buffetsRouter = require("./buffets.routes");
const menusRouter = require("./menus.routes");
const reviewsRouter = require("./reviews.routes");
const usersRouter = require("./users.routes");

router.use("/buffets", buffetsRouter);
router.use("/menus", menusRouter);
router.use("/reviews", reviewsRouter);
router.use("/users", usersRouter);

module.exports = router;
