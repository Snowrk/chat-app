import clientPromise from "@/lib/mongodb";
import { v4 } from "uuid";
import { genKeys } from "@/app/server-functions";

export async function POST(request) {
  const client = await clientPromise;
  const chatApp = client.db("chatApp");
  const rooms = chatApp.collection("rooms");
  const users = chatApp.collection("users");
  const { roomName, imgUrl, userId, friendId, type } = await request.json();
  const roomId = v4();
  const usersList = userId !== undefined ? [userId, friendId] : [];
  const roomKeys = await genKeys();
  if (roomName === "Global") {
    return Response.json({ err: "Global is reserved name" }, { status: 400 });
  }
  await rooms.insertOne({
    roomId,
    roomName,
    imgUrl: imgUrl !== undefined ? imgUrl : null,
    type,
    keys: roomKeys,
    users: usersList,
    messages: [],
  });

  const user = await users.findOne({ userId });
  const friend = await users.findOne({ userId: friendId });
  console.log(user);
  console.log(friend);
  await users.updateOne(
    { userId },
    { $set: { rooms: [...user.rooms, roomId] } }
  );
  await users.updateOne(
    { userId: friendId },
    { $set: { rooms: [...friend.rooms, roomId] } }
  );

  const projection = {
    _id: 0,
    messages: 0,
  };
  const room = await rooms.findOne({ roomId }, projection);
  return Response.json(room, { status: 200 });
}
