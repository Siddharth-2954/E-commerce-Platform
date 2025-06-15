const Order = require("../models/Order");
const Cart = require("../models/Cart");

const createOrder = async (req, res) => {
    try {
        const { userId, items, shippingAddress, paymentMethod, totalAmount } = req.body;
        console.log("Creating order with data:", { userId, items, shippingAddress, paymentMethod, totalAmount });

        // Create new order
        const order = new Order({
            userId,
            items,
            shippingAddress,
            paymentMethod,
            totalAmount,
        });

        // Save the order
        await order.save();
        console.log("Order saved successfully:", order);

        // Clear the user's cart after successful order
        await Cart.findOneAndDelete({ userId });
        console.log("Cart cleared for user:", userId);

        // Return populated order
        const populatedOrder = await Order.findById(order._id)
            .populate({
                path: "items.productId",
                select: "name price image description",
            })
            .populate("userId", "name email");

        console.log("Returning populated order:", populatedOrder);
        res.status(201).json(populatedOrder);
    } catch (error) {
        console.error("Create order error:", error);
        res.status(500).json({ message: error.message });
    }
};

const getOrders = async (req, res) => {
    try {
        console.log("User from token:", req.user); // Debug log
        const userId = req.user.id; // Changed from _id to id to match token payload
        console.log("Fetching orders for user:", userId); // Debug log

        const orders = await Order.find({ userId })
            .populate({
                path: "items.productId",
                select: "name price image description",
            })
            .sort({ createdAt: -1 }); // Sort by newest first

        console.log("Found orders:", orders); // Debug log
        res.status(200).json(orders);
    } catch (error) {
        console.error("Get orders error:", error);
        res.status(500).json({ message: error.message });
    }
};

const getOrderById = async (req, res) => {
    try {
        const orderId = req.params.id;
        const userId = req.user.id; // Changed from _id to id to match token payload

        const order = await Order.findOne({ _id: orderId, userId })
            .populate({
                path: "items.productId",
                select: "name price image description",
            })
            .populate("userId", "name email");

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.status(200).json(order);
    } catch (error) {
        console.error("Get order by ID error:", error);
        res.status(500).json({ message: error.message });
    }
};

const updateOrderStatus = async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createOrder, getOrders, getOrderById, updateOrderStatus };
