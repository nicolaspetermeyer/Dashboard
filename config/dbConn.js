const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI, {
      collection: "drone_object_detection",
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;
