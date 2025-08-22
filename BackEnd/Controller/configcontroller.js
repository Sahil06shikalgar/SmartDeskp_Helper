const Config = require("../Models/Config");

// ✅ Default config values
const DEFAULT_CONFIG = {
  autoCloseEnabled: true,
  confidenceThreshold: 0.7,
  slaHours: 24,
};

// GET current config (auto-create if missing)
const getConfig = async (req, res) => {
  try {
    let config = await Config.findOne();

    if (!config) {
      config = await Config.create(DEFAULT_CONFIG);
    }

    res.json(config);
  } catch (err) {
    console.error("Config Error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// UPDATE config (auto-create if missing)
const updateConfig = async (req, res) => {
  try {
    const { autoCloseEnabled, confidenceThreshold, slaHours } = req.body;

    let config = await Config.findOne();

    if (!config) {
      config = new Config(DEFAULT_CONFIG);
    }

    if (autoCloseEnabled !== undefined) config.autoCloseEnabled = autoCloseEnabled;
    if (confidenceThreshold !== undefined) config.confidenceThreshold = confidenceThreshold;
    if (slaHours !== undefined) config.slaHours = slaHours;

    await config.save();
    res.json(config);
  } catch (err) {
    console.error("Config Update Error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = {
  getConfig,
  updateConfig,
};
