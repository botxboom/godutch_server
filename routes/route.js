const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const Category = require("../models/Category");

router.get("/getList", async (req, res) => {
  const getCategory = await Category.find();
  res.send(getCategory);
});

router.post("/createType", async (req, res) => {
  const { value, color } = req.body.params;
  const newColor = "#" + (((1 << 24) * Math.random()) | 0).toString(16);

  const isExist = await Category.findOne({ value });
  if (isExist) {
    res.send({ error: "already exist" });
  } else {
    const fColor = color ? color : newColor;

    const newCategory = new Category({
      _id: new mongoose.Types.ObjectId(),
      value,
      color: fColor,
    });

    const response = await newCategory.save();
    return res.send({ expense: response });
  }
});

router.post("/deleteType", async (req, res) => {
  const { _id } = req.body.params;
  const cat = await Category.findOne({ _id });
  if (cat !== null) {
    Category.deleteOne({ _id: cat._id }, (err, doc) => {
      if (err) {
        return res.send({ error: "something went wrong" });
      } else {
        return res.send({ deleted: doc });
      }
    });
  } else {
    res.status(404).send({ error: "something went wrong" });
  }
});

module.exports = router;
