const mongoose = require("mongoose");

const auditSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  action: { type: String, required: true }, // e.g., "Created Ticket", "Added Suggestion"
  ticket: { type: mongoose.Schema.Types.ObjectId, ref: "Ticket" }, // optional
  details: { type: String }, // optional extra info
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Audit", auditSchema);



