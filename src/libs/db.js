import mongoose from "mongoose";

const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to Database..");
  } catch (error) {
    console.log("Error while connecting to Database..", error);
  }
};

export default connectMongoDB;
