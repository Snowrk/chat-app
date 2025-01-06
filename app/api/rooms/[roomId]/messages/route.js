import clientPromise from "@/lib/mongodb";

export async function GET(request, { params }) {
  const roomId = (await params).roomId;
  const client = await clientPromise;
  const chatApp = client.db("chatApp");
  const rooms = chatApp.collection("rooms");
  const room = await rooms.findOne({ roomId });
  return Response.json(room.messages, { status: 200 });
}
