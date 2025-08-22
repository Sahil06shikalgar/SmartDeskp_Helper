const express = require("express");
const { getConfig, updateConfig } = require("../Controller/configcontroller");
const { protect, adminonly } = require("../Middleware/authMiddleware");


const router = express.Router();

// GET config (all authenticated users can read)
router.get("/", protect, getConfig);

// UPDATE config (admin only)
router.put("/", protect, adminonly, updateConfig);

module.exports = router;


