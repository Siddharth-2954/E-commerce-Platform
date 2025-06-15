const express = require("express");
const { addReview, getProductReviews } = require("../controllers/reviewController");
const router = express.Router();

router.post("/", addReview);
router.get("/:productId", getProductReviews);

module.exports = router;