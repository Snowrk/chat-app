import clientPromise from "@/lib/mongodb";
import { headers } from "next/headers";

export async function GET() {
  const headersList = await headers();
  const userId = headersList.get("userId");
  const client = await clientPromise;
  const chatApp = client.db("chatApp");
  const rooms = chatApp.collection("rooms");
  const projection = {
    _id: 0,
    messages: 0,
  };
  const list = await rooms.find().project(projection).toArray();
  console.log(list);
  const newList = list
    .filter((e) => e.users.includes(userId))
    .map((item) => ({ roomId: item.roomId, roomName: item.roomName }));

  return Response.json(newList, { status: 200 });
}
