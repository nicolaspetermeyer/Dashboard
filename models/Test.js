const mongoose = require("mongoose");

const TestSchema = new mongoose.Schema({
  _id: Number,
  label_name: String,
});
const Test = mongoose.model("Test", TestSchema);

module.exports = Test;
