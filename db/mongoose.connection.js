import mongoose from "mongoose";

const connectionDB = async () => {
  try {

    console.log("MONGODB_URL:", process.env.MONGODB_URL);

    await mongoose.connect(process.env.MONGODB_URL);

    console.log("✅ MongoDB Connected");

  } catch (error) {

    console.log("❌ MongoDB Connection Error");

    console.log(error);

  }
};

export default connectionDB;