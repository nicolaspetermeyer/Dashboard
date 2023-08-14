const mongoose = require("mongoose");


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // collection: "drone_object_detection",
    });
    console.log(mongoose.connection.readyState);
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;
