import mongoose, { Mongoose } from "mongoose";

const MONOGODB_URL = process.env.MONGODB_URI;

interface MongooseConnection {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

let cashed: MongooseConnection = (global as any).mongoose;

if (!cashed) {
  cashed = (global as any).mongoose = { conn: null, promise: null };
}

export const connectToDatabase = async () => {
  if (cashed.conn) {
    return cashed.conn;
  }

  if (!MONOGODB_URL) {
    throw new Error("Please set the MONGODB_URI environment variable.");
  }

  cashed.promise =
    cashed.promise ||
    mongoose.connect(MONOGODB_URL, {
      dbName: "imaginify",
      bufferCommands: false,
    });
    cashed.conn = await cashed.promise;
    return cashed.conn;
};
