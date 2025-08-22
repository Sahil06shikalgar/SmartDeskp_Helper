const express = require("express");
const { enqueueTriage, getAgentSuggestions } = require("../Controller/AgentController");
const { protect, agentOnly } = require("../Middleware/authMiddleware");

const router = express.Router();

// POST /api/agent/triage → enqueue triage for a ticket
router.post("/triage", protect, agentOnly, enqueueTriage);

// GET /api/agent/suggestion/:ticketid → fetch agent suggestions for a ticket
router.get("/suggestion/:ticketid", protect, agentOnly, getAgentSuggestions);

module.exports = router;
