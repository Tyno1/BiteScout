import mongoose from "mongoose";

const URI = process.env.MONGODB_CONNECTION_STRING;

global.mongoose = {
  conn: null,
  promise: null,
};

export default async function dbConnect() {
  if (global.mongoose && global.mongoose.conn) {
    console.log("connected from previous");

    return global.mongoose.conn;
  } else {
    const promise = mongoose.connect(URI, { autoIndex: true });
    global.mongoose = {
      conn: await promise,
      promise,
    };
    console.log("Connected to MongoDB");
    return await promise;
  }
}