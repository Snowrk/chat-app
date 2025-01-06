import clientPromise from "@/lib/mongodb";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { SignJWT } from "jose";

export async function POST(request) {
  const { username, password } = await request.json();
  const client = await clientPromise;
  const chatApp = client.db("chatApp");
  const users = chatApp.collection("users");
  const rooms = chatApp.collection("rooms");
  const user = await users.findOne({
    userName: { $regex: `${username}`, $options: "i" },
  });
  console.log(user);
  if (user) {
    return Response.json({ err: "User already registered" }, { status: 400 });
  } else {
    const hashedPassword = await bcrypt.hash(password, 10);
    let globalRoom = await rooms.findOne({ roomName: "Global" });
    const globalKeys = await genKeys();
    if (!globalRoom) {
      const globalRoomId = v4();
      await rooms.insertOne({
        roomId: globalRoomId,
        roomName: "Global",
        type: "group",
        imgUrl: null,
        keys: globalKeys,
        users: [],
        messages: [],
      });
      globalRoom = await rooms.findOne({ roomName: "Global" });
    }
    const userId = v4();
    await users.insertOne({
      userId: userId,
      userName: username,
      password: hashedPassword,
      online: false,
      profileImgUrl: null,
      rooms: [globalRoom.roomId],
    });
    const newUsers = [...globalRoom.users, userId];
    await rooms.updateOne(
      { roomName: "Global" },
      { $set: { users: newUsers } }
    );
    const newUserList = [...globalRoom.users, userId];
    await rooms.updateOne(
      { roomName: "Global" },
      { $set: { users: newUserList } }
    );
    const payload = { userId: user.userId };
    const jwtToken = await new SignJWT(
      payload,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );
    return Response.json({ jwtToken }, { status: 200 });
  }
}
