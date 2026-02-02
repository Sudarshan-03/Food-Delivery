import mongoose from "mongoose";
import dotenv from "dotenv";
import userModel from "./models/userModel.js";
import foodModel from "./models/foodModel.js";

dotenv.config();

const verifyData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to DB: " + mongoose.connection.name);

        const userCount = await userModel.countDocuments({});
        const foodCount = await foodModel.countDocuments({});

        console.log(`Users found: ${userCount}`);
        console.log(`Food items found: ${foodCount}`);

        if (foodCount > 0) {
            const firstFood = await foodModel.findOne({});
            console.log("Sample Food Item Image:", firstFood.image);
        }

        if (userCount === 0 && foodCount === 0) {
            console.log("WARNING: Database appears empty.");

            // List all databases
            const admin = new mongoose.mongo.Admin(mongoose.connection.db);
            const result = await admin.listDatabases();
            console.log("Available Databases:");
            result.databases.forEach(db => console.log(` - ${db.name} (Size: ${db.sizeOnDisk})`));
        } else {
            console.log("SUCCESS: Data found. You are connected to the existing database.");
        }

        mongoose.connection.close();
    } catch (error) {
        console.error("Verification failed:", error);
    }
}

verifyData();
