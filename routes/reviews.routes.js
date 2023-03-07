const express = require("express");
const authMiddleware = require("../middlewares/auth-middleware");
const router = express.Router();
const ReviewController = require("../controller/review.controller")
const reviewController = new ReviewController();

//post
router.post("/:buffet_id", authMiddleware, reviewController.postToReview);
router.get("/:buffet_id", reviewController.getReview);
router.put("/:review_id", authMiddleware, reviewController.updateReview);
router.delete("/:review_id", authMiddleware, reviewController.deleteReview);


module.exports = router;
