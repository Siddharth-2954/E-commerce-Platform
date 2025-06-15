const Support = require("../models/Support");

const createSupportTicket = async (req, res) => {
    try {
        const ticket = await Support.create(req.body);
        res.status(201).json(ticket);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getUserSupportTickets = async (req, res) => {
    try {
        const tickets = await Support.find({ userId: req.params.userId });
        res.status(200).json(tickets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createSupportTicket, getUserSupportTickets };
