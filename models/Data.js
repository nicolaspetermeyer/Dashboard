const mongoose = require("mongoose");

const DataSchema = new mongoose.Schema({
  _id: String,
  image: String,
  detections: [
    {
      label_name: String,
      tracking_id: Number,
      confidence: Number,
      box: [Number],
    },
  ],
});
const Data = mongoose.model("Data", DataSchema);

module.exports = Data;

