import { NextResponse } from "next/server";
import sql from "@/app/lib/db/db";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json();

    if (!email.includes("monster")) {
      return NextResponse.json(
        { error: "Email must be valid'" },
        { status: 400 }
      );
    }

    if (!email || !password || !name) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await sql`
      INSERT INTO users (email, name, password, role)
      VALUES (${email}, ${name}, ${hashedPassword}, 'user')
    `;

    return NextResponse.json({ message: "User registered" });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "User already exists or DB error" },
      { status: 500 }
    );
  }
}
