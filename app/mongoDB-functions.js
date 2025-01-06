import clientPromise from "../lib/mongodb";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

async function run() {
  try {
    const client = await clientPromise;
    const chatApp = client.db("ChatApp");
    const users = chatApp.collection("users");
    const rooms = chatApp.collection("rooms");
  } catch (error) {
    console.log("error in connecting mongoDB", error);
  }
}
run();

const authenticator = async () => {
  const cookieStore = await cookies();
  const jwtToken = cookieStore.get("jwtToken");
  if (!jwtToken) {
    return false;
  } else {
    jwt.verify(jwtToken, "SECRET_KEY", async (err, payload) => {
      if (err || !(await users.findOne({ userId: payload.userId }))) {
        return false;
      } else {
        return payload;
      }
    });
  }
};

export async function fetchInitialValues() {}
