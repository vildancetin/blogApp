"use strict";
/* -------------------------------------------------------
    BLOG API PROJECT WITH MONGOOSE
------------------------------------------------------- */
const express = require("express");
const app = express();

// to json
app.use(express.json());

// env configs
require("dotenv").config();
const PORT = process.env.PORT;
const HOST = process.env.HOST;

// db connection import
require("./src/configs/dbConnection");

app.all("/", (req, res) => {
  res.send("WELCOME BLOG API PROJECT");
});
app.use(require("./src/middlewares/findSearchSortPage"));

app.use(require("./src/routes/index"))

// error-handler
app.use(require("./src/middlewares/errorHandler"));

app.listen(PORT, () => console.log(`Server Running on http://${HOST}:${PORT}`));
