import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "All fields are required." },
        { status: 400 }
      );
    }

    if (!email.includes("monster")) {
      return NextResponse.json(
        { message: "Email must be special" },
        { status: 400 }
      );
    }

    if (typeof password !== "string" || password.length < 6) {
      return NextResponse.json(
        { message: "Password must be at least 6 characters." },
        { status: 400 }
      );
    }
    // Check if user already exists
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      // user already exists
      return NextResponse.json(
        { message: "Email already registered." },
        { status: 409 }
      );
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Insert user
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "user",
      },
    });
    return NextResponse.json({ message: "Registration successful." });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { message: "Registration failed." },
      { status: 500 }
    );
  }
}
