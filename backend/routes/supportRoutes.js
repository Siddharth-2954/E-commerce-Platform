const express = require("express");
const { createSupportTicket, getUserSupportTickets } = require("../controllers/supportController");
const router = express.Router();

router.post("/", createSupportTicket);
router.get("/:userId", getUserSupportTickets);

module.exports = router;
