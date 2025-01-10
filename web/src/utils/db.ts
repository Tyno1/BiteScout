import { MongoClient } from "mongodb";
import mongoose from "mongoose";

declare global {
  var mongoose: {
    conn: null | mongoose.Connection;  // Changed type
    promise: null | Promise<mongoose.Connection>;  // Changed type
  };
}

if (!process.env.MONGODB_CONNECTION_STRING) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_CONNECTION_STRING;

// For NextAuth MongoDB adapter
let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

// For Mongoose connections and models
global.mongoose = {
  conn: null,
  promise: null,
};

async function dbConnect() {
  if (global.mongoose && global.mongoose.conn) {
    return global.mongoose.conn;
  } else {
    const promise = mongoose.connect(uri);
    global.mongoose = {
      conn: (await promise).connection,  // Store the connection object
      promise: promise.then(m => m.connection)  // Transform promise to return connection
    };
    return (await promise).connection;  // Return the connection object
  }
}

export { clientPromise, dbConnect };