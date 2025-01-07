import "dotenv/config";
import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";
import { MongoClient, ServerApiVersion } from "mongodb";
// import clientPromise from "./lib/mongodb.js";
// import {
//   updateMessages,
//   updateOffline,
//   updateOnline,
// } from "./mongoDB-functions";

const client = new MongoClient(process.env.MONGODB, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } catch (e) {
    console.log(e);
  }
}
run().catch(console.dir);

const chatApp = client.db("chatApp");
const users = chatApp.collection("users");
const rooms = chatApp.collection("rooms");

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);

  io.on("connection", (socket) => {
    // console.log("yo");
    socket.on("connectRooms", (roomsList) => {
      // console.log(roomsList, socket.id);
      roomsList.forEach((element) => {
        socket.join(element.roomId);
      });
      // console.log(socket.rooms);
    });
    // socket.onAny((event, ...args) => {
    //   console.log(`got ${event}`, args);
    // });
    // socket.onAnyOutgoing((event, ...args) => {
    //   console.log(`got ${event}`, args);
    // });
    socket.on("send-message", async (msgObj, roomId) => {
      // console.log(socket.rooms);
      socket.to(roomId).emit("receive-message", msgObj, roomId);
      const room = await rooms.findOne({ roomId });
      const idx = room.messages.findIndex((e) => e.id === msgObj.id);
      if (idx === -1) {
        await rooms.updateOne(
          { roomId },
          { $set: { messages: [...room.messages, msgObj] } }
        );
      }
      // console.log("after update", await rooms.findOne({ roomId }));
    });
    socket.on("userDisconnect", async (profile) => {
      socket.broadcast.emit("userDisconnect", profile);
      await users.updateOne(
        { userId: profile.userId },
        { $set: { online: false } }
      );
      // const onlineUsers = await users.find({ online: false }).toArray();
      // console.log(onlineUsers, "userDisconnect");
    });
    socket.on("userConnect", async (profile) => {
      socket.broadcast.emit("userConnect", profile);
      await users.updateOne(
        { userId: profile.userId },
        { $set: { online: true } }
      );
      // const onlineUsers = await users.find({ online: true }).toArray();
      // console.log(onlineUsers, "userConnect");
    });
  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});

process.on("SIGINT", async () => {
  console.log("Gracefully shutting down...");
  try {
    await client.close(); // Close MongoDB connection
    console.log("MongoDB connection closed");
    process.exit(0); // Exit the process
  } catch (err) {
    console.error("Error while closing MongoDB connection", err);
    process.exit(1); // Exit with failure code
  }
});

process.on("SIGTERM", async () => {
  console.log("Received SIGTERM, shutting down gracefully...");
  try {
    await client.close();
    console.log("MongoDB connection closed");
    process.exit(0);
  } catch (err) {
    console.error("Error while closing MongoDB connection", err);
    process.exit(1);
  }
});
