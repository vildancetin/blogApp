"use strict";
/* -------------------------------------------------------
    BLOG API PROJECT WITH MONGOOSE
------------------------------------------------------- */
const express = require("express");
const app = express();

app.use(express.json());

require("dotenv").config();
const PORT = process.env.PORT;
const HOST = process.env.HOST;


app.all("/",(req,res)=>{
    res.send("WELCOME BLOG API PROJECT")
})

app.use(require("./src/middlewares/errorHandler"))
app.listen(PORT, () => console.log(`Server Running on http://${HOST}:${PORT}`));
