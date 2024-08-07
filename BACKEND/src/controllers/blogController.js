"use strict";
/* ====================================================== */
/*                     BLOG API CONTROLLERS               */
/* ====================================================== */

// to catch if be able to async errors
require("express-async-errors");
const { BlogCategory, BlogPost, BlogComment } = require("../models/blog");

// ? CRUD + list operations for category and post
// ? getModelList is a function that take an argument as a Model and return sorted,filtered,searched,limited data
// ? getModelListDetails return data details
module.exports.BlogCategory = {
  list: async (req, res) => {
    const data = await res.getModelList(BlogCategory,{},[
        {path:"posts",select:"title"}
    ]);
    res.status(200).send({
      error: false,
      detail: await res.getModelListDetails(BlogCategory),
      data,
    });
  },
  create: async (req, res) => {
    const data = await BlogCategory.create(req.body);
    res.status(201).send({
      error: false,
      body: req.body,
      data,
    });
  },
  read: async (req, res) => {
    const data = await BlogCategory.find({ _id: req.params.categoryId }).populate( {path:"posts",select:"title"});
    res.status(202).send({
      error: false,
      data,
    });
  },
  update: async (req, res) => {
    const data = await BlogCategory.updateOne(
      { _id: req.params.categoryId },
      req.body
    );
    const newData = await BlogCategory.find({ _id: req.params.categoryId }).populate( {path:"posts",select:"title"});
    res.status(202).send({
      error: false,
      body: req.body,
      data,
      newData,
    });
  },
  delete: async (req, res) => {
    const data = await BlogCategory.deleteOne({ _id: req.params.categoryId });
    res.sendStatus(data.deletedCount >= 1 ? 204 : 404);
  },
  // ? it returns filtered "post data" by category
  posts: async (req, res) => {
    const data = await res.getModelList(
      BlogPost,
      { blogCategoryId: req.params.categoryId },
      { path: "blogCategoryId", select: "name" }
    );
    res.status(200).send({
      error: false,
      detail: await res.getModelListDetails(BlogPost),
      data,
    });
  },
};
module.exports.BlogPost = {
  list: async (req, res) => {
    const data = await res.getModelList(BlogPost, {}, [
      // nested populate
      {
        path: "comments",
        select: "content author",
        populate: { path: "author", select: "email" },
      },
      { path: "blogCategoryId", select: "name" },
    ]);
    res.status(200).send({
      error: false,
      detail: await res.getModelListDetails(BlogPost),
      data,
    });
  },
  //   ? when post is created, find the matches category and add the post to matches category posts
  create: async (req, res) => {
    const data = await BlogPost.create(req.body);
    const category = await BlogCategory.findOne({
      _id: req.body.blogCategoryId,
    });
    if (!category) {
      return res.status(404).send({
        error: true,
        message: "Categories not found",
      });
    }
    // ? save the post to category posts fields
    category.posts.push(data._id);
    await category.save();

    res.status(201).send({
      error: false,
      body: req.body,
      data,
    });
  },
  read: async (req, res) => {
    const data = await BlogPost.find({ _id: req.params.postId }).populate([
      {
        path: "comments",
        select: "content author",
        populate: { path: "author", select: "email" },
      },
      { path: "blogCategoryId", select: "name" },
    ]);
    res.status(202).send({
      error: false,
      data,
    });
  },
  update: async (req, res) => {
    const data = await BlogPost.updateOne({ _id: req.params.postId }, req.body);
    const newData = await BlogPost.find({ _id: req.params.postId }).populate([
      {
        path: "comments",
        select: "content author",
        populate: { path: "author", select: "email" },
      },
      { path: "blogCategoryId", select: "name" },
    ]);
    res.status(202).send({
      error: false,
      body: req.body,
      data,
      newData,
    });
  },
  delete: async (req, res) => {
    const data = await BlogPost.deleteOne({ _id: req.params.postId });
    const category = await BlogCategory.findOne({ posts: req.params.postId });
    if (category) {
      category.posts.pull(req.params.postId);
      await category.save();
    }
    res.sendStatus(data.deletedCount >= 1 ? 204 : 404);
  },
  //   comments: async (req, res) => {
  //     const data = await res.getModelList(
  //       BlogComment,
  //       { post: req.params.postId },
  //       "post"
  //     );
  //     res.status(200).send({
  //       error: false,
  //       detail: await res.getModelListDetails(BlogComment),
  //       data,
  //     });
  //   },
};
module.exports.BlogComment = {
  list: async (req, res) => {
    const data = await res.getModelList(BlogComment, {}, [
      { path: "author", select: "email" },
      { path: "post", select: "title" },
    ]);
    res.status(200).send({
      error: false,
      detail: await res.getModelListDetails(BlogComment),
      data,
    });
  },
  create: async (req, res) => {
    try {
      // ? create a new comment and saves the comment to the relevant post
      const data = await BlogComment.create(req.body);
      const post = await BlogPost.findOne({ _id: req.body.post });
      if (!post) {
        return res.status(404).send({
          error: true,
          message: "Posts not found",
        });
      }
      // ? save the comment to post
      post.comments.push(data._id);
      await post.save();

      res.status(201).send({
        error: false,
        body: req.body,
        data,
      });
    } catch (error) {
      res.status(500).send({
        error: true,
        message: error.message,
      });
    }
  },
  read: async (req, res) => {
    const data = await BlogComment.find({ _id: req.params.commentId }).populate(
      [
        { path: "author", select: "email" },
        { path: "post", select: "title" },
      ]
    );
    res.status(202).send({
      error: false,
      data,
    });
  },
  update: async (req, res) => {
    const data = await BlogComment.updateOne(
      { _id: req.params.commentId },
      req.body
    );
    const newData = await BlogComment.find({
      _id: req.params.commentId,
    }).populate([
      { path: "author", select: "email" },
      { path: "post", select: "title" },
    ]);
    res.status(202).send({
      error: false,
      body: req.body,
      data,
      newData,
    });
  },
  delete: async (req, res) => {
    try {
      // ? when a comment deleted, it also deletes the comment on the releated post
      const data = await BlogComment.deleteOne({ _id: req.params.commentId });
      const post = await BlogPost.findOne({ comments: req.params.commentId });
      if (post) {
        post.comments.pull(req.params.commentId);
        await post.save();
      }
      res.sendStatus(data.deletedCount >= 1 ? 204 : 404);
    } catch (error) {
      res.status(500).send({
        error: true,
        message: error.message,
      });
    }
  },
};
