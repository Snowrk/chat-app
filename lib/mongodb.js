import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB);

let clientPromise;

if (process.env.NODE_ENV === "development") {
  // In development, use a global variable so the MongoClient isn't re-created on every hot reload
  if (!global._mongoClientPromise) {
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production, it's safe to directly use the client
  clientPromise = client.connect();
}

export default clientPromise;
