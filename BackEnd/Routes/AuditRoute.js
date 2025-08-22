const express = require("express");
const { getAllAudits } = require("../Controller/auditcontroller");
const { protect, adminonly } = require("../Middleware/authMiddleware");

const router = express.Router();

// GET /api/audit → only admin can view all audit logs
router.get("/", protect, adminonly, getAllAudits);

module.exports = router;
