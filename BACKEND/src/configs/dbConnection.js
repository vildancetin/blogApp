"use strict";
/* -------------------------------------------------------
    EXPRESSJS - MONGODB Connection Mongoose
------------------------------------------------------- */

const mongoose = require("mongoose");
const MONGODB = process.env.MONGODB;

// connect to database
mongoose
  .connect(MONGODB)
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log("DB Not Conected !", err));
