"use strict";
/* ====================================================== */
/*                     BLOG API CONTROLLERS               */
/* ====================================================== */

require("express-async-errors");
const User = require("../models/user");

// CRUD + list operations for user
module.exports = {
  list: async (req, res) => {
    const data = await res.getModelList(User);
    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(User),
      data,
    });
  },
  create: async (req, res) => {
    const data = await User.create(req.body);
    res.status(201).send({
      error: false,
      body: req.body,
      data,
    });
  },
  read: async (req, res) => {
    const data = await User.find({ _id: req.params.userId });
    res.status(202).send({
      error: false,
      data,
    });
  },

  update: async (req, res) => {
    // ? runValidators -> Validates the incoming email expression when update according to the required data.
    const data = await User.updateOne({ _id: req.params.userId }, req.body, {
      runValidators: true,
    });
    const newData = await User.find({ _id: req.params.userId });
    res.status(202).send({
      error: false,
      body: req.body,
      data,
      newData,
    });
  },
  delete: async (req, res) => {
    const data = await User.deleteOne({ _id: req.params.userId });
    res.sendStatus(data.deletedCount >= 1 ? 204 : 404);
  },
};
