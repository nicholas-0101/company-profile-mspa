import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, username } = body;

    const existingUser = await prisma.account.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ message: "Email already in use" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.account.create({
      data: {
        email,
        username,
        password: hashedPassword,
      },
    });

    return NextResponse.json({ message: "User created", user: { objectId: newUser.id, username: newUser.username, email: newUser.email } }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
