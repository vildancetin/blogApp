"use strict";
/* ====================================================== */
/*                     BLOG API Routes               */
/* ====================================================== */

const router = require("express").Router();

// /blog
router.use("/blog", require("./blogRouter"));
// /user
router.use("/user", require("./userRouter"));

module.exports=router