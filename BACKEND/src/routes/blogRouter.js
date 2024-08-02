"use strict";
/* ====================================================== */
/*                     BLOG API Routes               */
/* ====================================================== */

const router = require("express").Router();

const { BlogCategory, BlogPost,BlogComment } = require("../controllers/blogController");


// Blog Category
router.route("/categories").get(BlogCategory.list).post(BlogCategory.create);
router
  .route("/categories/:categoryId")
  .get(BlogCategory.read)
  .put(BlogCategory.update)
  .patch(BlogCategory.update)
  .delete(BlogCategory.delete);

// Blog Post
router.route("/posts").get(BlogPost.list).post(BlogPost.create);
router
  .route("/posts/:postId")
  .get(BlogPost.read)
  .put(BlogPost.update)
  .patch(BlogPost.update)
  .delete(BlogPost.delete);

  // Blog Comment
  router.route("/posts").get(BlogComment.list).post(BlogComment.create);
router
  .route("/comments/:commentId")
  .get(BlogComment.read)
  .put(BlogComment.update)
  .patch(BlogComment.update)
  .delete(BlogComment.delete);
  
module.exports = router;
