const mongoose = require("mongoose");

const connectDB = async () => {
  console.log("hee", process.env.MONGO_URI);
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI, {});

    console.log("mongo db connected", connection.connection.host);
  } catch (e) {
    console.error(e.message);
    process.exit();
  }
};

module.exports = connectDB;
