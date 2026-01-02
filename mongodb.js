import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URI}/E-commerce`);
    console.log("Conntected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1); // Exit process if connection fails
  }

  // 500 server not found

  mongoose.connection.on("error", (err) => {
    console.log("Mongo DB connetion Error : ", err);
  });
};

export default connectDB;
