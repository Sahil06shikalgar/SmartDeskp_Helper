const express = require("express");
const { getAgentSuggestions } = require("../Controller/AgentSuggestionController.js");
const { protect } = require("../Middleware/authMiddleware.js");


const router = express.Router();

/**
 * @route   GET /api/agent-suggestions/:ticketId
 * @desc    Get AI/KB-based agent suggestions for a ticket
 * @access  Private (requires login)
 */
router.get("/:ticketId", protect, getAgentSuggestions);

module.exports = router;

