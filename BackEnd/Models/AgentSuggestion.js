// models/Article.js
const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    tags: [{ type: String }],
    status: { type: String, enum: ["draft", "published"], default: "published" },
  },
  { timestamps: true }
);

// 🔑 Create text index for searching
articleSchema.index({ title: "text", body: "text", tags: "text" });

module.exports = mongoose.model("Article", articleSchema);
