import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";
// import clientPromise from "./lib/mongodb.js";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);
  // let client;
  // clientPromise.then((value) => {
  //   client = value;
  // });
  // const chatApp = client.db("ChatApp");
  // const users = chatApp.collection("users");
  // const rooms = chatApp.collection("rooms");

  io.on("connection", (socket) => {
    console.log("yo");
    socket.on("connectRooms", (roomsList) => {
      // console.log(roomsList, socket.id);
      roomsList.forEach((element) => {
        socket.join(element.roomId);
      });
      // console.log(socket.rooms);
    });
    socket.onAny((event, ...args) => {
      console.log(`got ${event}`, args);
    });
    socket.onAnyOutgoing((event, ...args) => {
      console.log(`got ${event}`, args);
    });
    socket.on("send-message", async (msgObj, roomId) => {
      console.log(socket.rooms);
      socket.to(roomId).emit("receive-message", msgObj, roomId);
      // const room = await rooms.findOne({ roomId });
      // const idx = room.messages.findIndex((e) => e.id === msgObj.id);
      // if (idx === -1) {
      //   await rooms.updateOne(
      //     { roomId },
      //     { $set: { messages: [...room.messages, msgObj] } }
      //   );
      // }
      // console.log("after update", await rooms.findOne({ roomId }));
    });
    socket.on("userDisconnect", async (profile) => {
      socket.broadcast.emit("userDisconnect", profile);
      // await users.updateOne(
      //   { userId: profile.userId },
      //   { $set: { online: false } }
      // );
      // const onlineUsers = await users.find({ online: false }).toArray();
      // console.log(onlineUsers, "userDisconnect");
    });
    socket.on("userConnect", async (profile) => {
      socket.broadcast.emit("userConnect", profile);
      // await users.updateOne(
      //   { userId: profile.userId },
      //   { $set: { online: true } }
      // );
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
