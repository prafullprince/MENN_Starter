import mongoose from "mongoose";
import "dotenv/config";

export async function connectDB() {
    try {
        if(!process.env.MONGO_URI) {
            throw new Error("MONGO URI NOT FOUND");
        }
        await mongoose.connect(process.env.MONGO_URI);      
        console.log("mongodb connected");
    } catch (error) {
        console.log("Mongodb Connection Failed", error);
        process.exit(1);
    }
}
