import clientPromise from "@/lib/mongodb";
import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
import { SignJWT } from "jose";

export async function POST(request) {
  const { username, password } = await request.json();
  const client = await clientPromise;
  const chatApp = client.db("chatApp");
  const users = chatApp.collection("users");
  const user = await users.findOne({
    userName: { $regex: `${username}`, $options: "i" },
  });
  console.log(user);
  if (!user) {
    return Response.json({ err: "User not registered" }, { status: 400 });
  } else if (!(await bcrypt.compare(password, user.password))) {
    return Response.json({ err: "Incorrect password" }, { status: 400 });
  } else {
    const payload = { userId: user.userId };
    const jwtToken = await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("7d")
      .sign(new TextEncoder().encode(process.env.JWT_SECRET));
    console.log("login JWTToken", jwtToken);
    return Response.json({ jwtToken }, { status: 200 });
  }
}
