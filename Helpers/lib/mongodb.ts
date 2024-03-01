import mongoose from "mongoose";
import { MongoClient } from "mongodb";

const { NEXT_PUBLIC_MONGODB_CONN } = process.env

if (!NEXT_PUBLIC_MONGODB_CONN) {
    throw new Error("Invalid Connection")
}

export const client = new MongoClient(NEXT_PUBLIC_MONGODB_CONN);
export const connectToMongoDB = async () => {
    try {
        const { connection } = await mongoose.connect(NEXT_PUBLIC_MONGODB_CONN)
        if (connection.readyState == 1) {
            return Promise.resolve(true)
        }
    } catch (error) {
        return Promise.reject(error)
    }
}