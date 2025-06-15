const express = require("express");
const router = express.Router();
const { createOrder, getOrders, getOrderById } = require("../controllers/orderController");
const auth = require("../middleware/auth");

// Apply auth middleware to all order routes
router.use(auth);

// Create a new order
router.post("/", createOrder);

// Get all orders for the authenticated user
router.get("/", getOrders);

// Get a specific order by ID
router.get("/:id", getOrderById);

module.exports = router;
