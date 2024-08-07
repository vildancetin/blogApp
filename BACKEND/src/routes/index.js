"use strict";
/* ====================================================== */
/*                     BLOG API Routes               */
/* ====================================================== */

const router = require("express").Router();

// /tokens
router.use("/tokens",require("./tokenRouter"))
// /blogs
router.use("/blogs", require("./blogRouter"));
// /users
router.use("/users", require("./userRouter"));

module.exports=router