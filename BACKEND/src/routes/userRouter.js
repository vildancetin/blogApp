"use strict";
/* ====================================================== */
/*                     BLOG API Routes               */
/* ====================================================== */

const router = require("express").Router();

const user = require("../controllers/userController");

// Blog Category
router.route("/").get(user.list).post(user.create);
router
  .route("/:userId")
  .get(user.read)
  .put(user.update)
  .patch(user.update)
  .delete(user.delete);
module.exports = router;
