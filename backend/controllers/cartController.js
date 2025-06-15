const Cart = require("../models/Cart");
const mongoose = require("mongoose");

const getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.params.userId })
            .populate({
                path: 'products.productId',
                select: 'name price image description'
            });

        if (!cart) {
            return res.status(200).json({ products: [] });
        }

        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addToCart = async (req, res) => {
    try {
        const { userId, products } = req.body;
        const { productId, quantity } = products[0];

        // Validate userId and productId
        if (!userId || !productId) {
            return res.status(400).json({ message: "User ID and Product ID are required" });
        }

        // Find the cart
        let cart = await Cart.findOne({ userId });

        if (!cart) {
            // Create new cart if it doesn't exist
            cart = new Cart({
                userId,
                products: [{ productId, quantity }]
            });
        } else {
            // Check if product already exists in cart
            const existingProductIndex = cart.products.findIndex(
                item => item.productId.toString() === productId.toString()
            );

            if (existingProductIndex > -1) {
                // Update quantity if product exists
                cart.products[existingProductIndex].quantity += quantity;
            } else {
                // Add new product if it doesn't exist
                cart.products.push({ productId, quantity });
            }
        }

        // Save the cart
        await cart.save();

        // Return populated cart
        const populatedCart = await Cart.findById(cart._id)
            .populate({
                path: 'products.productId',
                select: 'name price image description'
            });

        res.status(201).json(populatedCart);
    } catch (error) {
        console.error("Add to cart error:", error);
        res.status(500).json({ message: error.message });
    }
};

const updateCartItem = async (req, res) => {
    try {
        const { quantity } = req.body;

        if (!Number.isInteger(quantity) || quantity <= 0) {
            return res.status(400).json({ message: "Invalid quantity" });
        }

        const cart = await Cart.findOneAndUpdate(
            { "products._id": req.params.id },
            { $set: { "products.$.quantity": quantity } },
            { new: true }
        ).populate({
            path: 'products.productId',
            select: 'name price image description'
        });

        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const removeCartItem = async (req, res) => {
    try {
        const cart = await Cart.findOneAndUpdate(
            { "products._id": req.params.id },
            { $pull: { products: { _id: req.params.id } } },
            { new: true }
        ).populate({
            path: 'products.productId',
            select: 'name price image description'
        });

        if (!cart) {
            return res.status(404).json({ message: "Cart item not found" });
        }

        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getCart, addToCart, updateCartItem, removeCartItem };
