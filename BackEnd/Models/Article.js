const express=require("express")
const mongoose=require("mongoose")
const cors=require("cors")

const ArticleSchema=mongoose.Schema({
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    body: {
      type: String,
      required: [true, "Body/content is required"],
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }

);

module.exports=mongoose.model("Article",ArticleSchema);