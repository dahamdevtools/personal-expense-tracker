import pool from "@/lib/db";
import { NextRequest } from "next/server";

export async function GET() {
  try {
    const [rows] = await pool.query("SELECT * FROM users");
    return Response.json(rows);
  } catch (error: any) {
    return Response.json(
      { error: "Cannot get users: " + error.message },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, email, password } = body;

    await pool.query(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [username, email, password],
    );

    return Response.json(
      { message: "User created successfully" },
      { status: 201 },
    );
  } catch (error: any) {
    return Response.json(
      { error: "Failed to create user: " + error.message },
      { status: 500 },
    );
  }
}
