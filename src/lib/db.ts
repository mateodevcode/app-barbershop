import mongoose from "mongoose";

export const connectMongoDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.USER_MONGODB}:${process.env.PASSWORD_MONGODB}@bsapp.nvlcfgi.mongodb.net/?retryWrites=true&w=majority&appName=bsapp`
    );
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Error al conectar a MongoDB", error);
  }
};
