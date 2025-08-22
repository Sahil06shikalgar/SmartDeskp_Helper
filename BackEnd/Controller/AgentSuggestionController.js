const Ticket = require("../Models/Ticket");
const Article = require("../Models/Article");

const getAgentSuggestions = async (req, res) => {
  try {
    const { ticketId } = req.params;

    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    let suggestions;

    try {
      // 🔍 Try using text index
      suggestions = await Article.find(
        { $text: { $search: ticket.subject + " " + ticket.description } },
        { score: { $meta: "textScore" } }
      )
        .sort({ score: { $meta: "textScore" } })
        .limit(5);
    } catch (err) {
      console.warn(" No text index found, using regex fallback");
      const query = ticket.subject + " " + ticket.description;
      suggestions = await Article.find({
        $or: [
          { title: new RegExp(query, "i") },
          { body: new RegExp(query, "i") },
          { tags: new RegExp(query, "i") },
        ],
      }).limit(5);
    }

    return res.status(200).json({
      ticketId: ticket._id,
      suggestions,
    });
  } catch (error) {
    console.error("Agent Suggestion Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getAgentSuggestions };
