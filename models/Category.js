const { model, Schema } = require("mongoose");
const mongoose = require("mongoose");

const categorySchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  value: {
    type: String,
  },
  color: {
    type: String,
  },
});

module.exports = model("Category", categorySchema);
