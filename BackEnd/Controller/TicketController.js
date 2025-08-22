 const Ticket=require("../Models/Ticket");

 const CreateTicket = async (req, res) => {
  try {
    const { title, description, priority } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: "title and description are required" });
    }

    const ticket = await Ticket.create({
      title,
      description,
      priority: priority || "Low",
      status: "open",
      user: req.user._id, // from protect middleware
    });

    res.status(201).json(ticket);
  } catch (error) {
    console.error("Ticket Create Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all tickets
const GetTickets = async (req, res) => {
  try {
    // Populate 'createdBy' and 'assignee' with name & email
    const tickets = await Ticket.find()
      .populate("createdBy", "name email")
      .populate("assignee", "name email");

    res.status(200).json(tickets);
    console.log("Fetched Tickets:", tickets);
  } catch (error) {
    console.error("GetTickets Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//Get Id Ticket

const GetTicketById = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id)
      .populate("createdBy", "name email")
      .populate("assignee", "name email");

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    res.status(200).json(ticket);
  } catch (error) {
    console.error("GetTicketById Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


const replyTicket = async (req, res) => {
  try {
    const { reply, status } = req.body; 
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) return res.status(404).json({ message: "Ticket not found" });
    ticket.status = status || ticket.status; 

    await ticket.save();
    res.status(200).json({ message: "Reply added & status updated", ticket });
  } catch (error) {
    console.error("ReplyTicket Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const assignTicket = async (req, res) => {
  try {
    const { assigneeId } = req.body; // ID of the agent
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) return res.status(404).json({ message: "Ticket not found" });

    ticket.assignee = assigneeId;
    ticket.status = "triaged"; // optional: mark as triaged when assigned

    await ticket.save();
    res.status(200).json({ message: "Ticket assigned successfully", ticket });
  } catch (error) {
    console.error("AssignTicket Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


module.exports={
   CreateTicket,
   GetTickets,
   GetTicketById,
   replyTicket,
   assignTicket


   

}