import pool from "@/lib/db";
import { RowDataPacket } from "mysql2";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !email.trim() || !password || !password.trim()) {
      return Response.json(
        { error: "All fields are required." },
        { status: 400 },
      );
    }

    const [rows] = await pool.query<RowDataPacket[]>(
      "SELECT * FROM users WHERE email = ?",
      [email],
    );

    if (rows.length === 0) {
      return Response.json(
        { error: "Invalid email or password." },
        { status: 401 },
      );
    }

    return Response.json({ message: "Login successfull" });
  } catch (error: any) {
    return Response.json(
      { error: "Failed to login: " + error.message },
      { status: 500 },
    );
  }
}
