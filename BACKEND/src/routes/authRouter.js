"use strict";
/* ====================================================== */
/*                     BLOG API Routes               */
/* ====================================================== */
const router = require("express").Router();
const Auth = require("../controllers/authController");

router.post("/login", Auth.login);
router.all("/logout",Auth.logout)

module.exports = router;
