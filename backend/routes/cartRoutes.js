const express = require("express");
const { getCart, addToCart, updateCartItem, removeCartItem } = require("../controllers/cartController");
const auth = require("../middleware/auth");
const router = express.Router();

// All cart routes require authentication
router.use(auth);

router.get("/:userId", getCart);
router.post("/", addToCart);
router.put("/:id", updateCartItem);
router.delete("/:id", removeCartItem);

module.exports = router;