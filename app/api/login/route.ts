import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import sql from "@/app/lib/db/db";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required." },
        { status: 400 }
      );
    }
    const users = await sql`SELECT * FROM users WHERE email = ${email}`;
    if (users.length === 0) {
      return NextResponse.json(
        { message: "Invalid email or password." },
        { status: 401 }
      );
    }
    const user = users[0];
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return NextResponse.json(
        { message: "Invalid email or password." },
        { status: 401 }
      );
    }
    // TODO: Set session/cookie here using NextAuth or custom logic
    // For now, just return success
    return NextResponse.json({ message: "Login successful." });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: "Login failed." }, { status: 500 });
  }
}
