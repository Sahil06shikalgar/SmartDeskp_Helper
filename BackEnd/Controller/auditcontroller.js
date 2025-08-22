const Audit = require("../Models/AuditLog");

// GET /api/audit → get all audit logs (admin only)
const getAllAudits = async (req, res) => {
  try {
    const audits = await Audit.find()
      .populate("user", "name email")
      .populate("ticket", "title status")
      .sort({ createdAt: -1 }); // latest first

    res.status(200).json(audits);
  } catch (error) {
    console.error("Error getAllAudits:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// POST /api/audit → create new audit log
const createAudit = async ({ userId, action, ticketId, details }) => {
  try {
    const audit = await Audit.create({
      user: userId,
      action,
      ticket: ticketId || null,
      details: details || "",
    });
    return audit;
  } catch (error) {
    console.error("Error createAudit:", error);
  }
};

module.exports = { getAllAudits, createAudit };
