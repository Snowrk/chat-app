import clientPromise from "@/lib/mongodb";

export async function GET() {
  const client = await clientPromise;
  const chatApp = client.db("chatApp");
  const users = chatApp.collection("users");
  const list = await users.find({ online: true }).toArray();
  return Response.json(list, { status: 200 });
}
