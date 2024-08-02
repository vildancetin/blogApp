"use strict";
/*
    BLOG API MODELS
*/
const mongoose = require("mongoose");
// Blog Post Model
const blogPostSchema = new mongoose.Schema(
  {
    blogCategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BlogCategory",
      required: true,
    },
    title: {
      type: String,
      trim: true,
      required: true,
    },
    content: {
      type: String,
      trim: true,
      required: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
    views: {
      type: Number,
      default: 0,
    },
    tags: [
      {
        type: String,
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "BlogComment",
        trim: true,
      },
    ],
  },
  {
    collection: "blogPost",
    timestamps: true,
  }
);
// Blog Category Model
const blogCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "BlogPost",
      },
    ],
  },
  {
    collection: "blogCategory",
    timestamps: true,
  }
);

const blogCommentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    post: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "BlogPost",
      required: true,
    },
  },
  {
    collection: "comment",
    timestamps: true,
  }
);
module.exports = {
  BlogCategory: mongoose.model("BlogCategory", blogCategorySchema),
  BlogPost: mongoose.model("BlogPost", blogPostSchema),
  BlogComment: mongoose.model("BlogComment", blogCommentSchema),
};
