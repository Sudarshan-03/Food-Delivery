import mongoose from "mongoose";
export const connectDB = async () => {
   try {
     await mongoose.connect('mongodb+srv://sudarshan:i2jy3sBVTD4nOHYX@cluster0.v0jzr6a.mongodb.net/food-del');
     console.log("DB connected");
   } catch (error) {
     console.error("DB connection error:", error);
   }
}