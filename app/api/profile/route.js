import clientPromise from "@/lib/mongodb";
import { headers } from "next/headers";

export async function GET() {
  const headersList = await headers();
  const userId = headersList.get("userId");
  console.log(userId);
  const client = await clientPromise;
  const chatApp = client.db("chatApp");
  const users = chatApp.collection("users");
  const user = await users.findOne({ userId });
  return Response.json(user, { status: 200 });
}
