const Ticket = require("../Models/Ticket");

// POST /api/agent/triage
const enqueueTriage = async (req, res) => {
  try {
    const { ticketId } = req.body;
    if (!ticketId) {
      return res.status(400).json({ message: "ticketId is required" });
    }

    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    // For now, just mark triage as enqueued
    ticket.triageStatus = "Enqueued";
    await ticket.save();

    res.status(200).json({ message: "Triage enqueued successfully", ticket });
  } catch (error) {
    console.error("Error enqueueTriage:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getAgentSuggestions = async (req, res) => {
  try {
    

    const ticketData = await Ticket.findById(req.params.ticketid).populate(
      "agentSuggestions.agent",
      "name email"
    );

    if (!ticketData) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    res.status(200).json({
      ticketId: ticketData._id,
      suggestions: ticketData.agentSuggestionId || []
    });
  } catch (error) {
    console.error("Error getAgentSuggestions:", error);
    res.status(500).json({ message: "Server error" });
  }
};


module.exports = { enqueueTriage, getAgentSuggestions };