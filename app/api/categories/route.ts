import { getCurrentUser } from "@/lib/auth";
import pool from "@/lib/db";
import { RowDataPacket } from "mysql2";
import { NextRequest } from "next/server";

export async function GET() {
  try {
    const session = await getCurrentUser();
    if (!session) {
      return Response.json({ error: "Not logged in." }, { status: 401 });
    }

    const [rows] = await pool.query(
      "SELECT * FROM categories WHERE user_id = ? ORDER BY name",
      [session.userId],
    );
    return Response.json(rows);
  } catch (error: any) {
    return Response.json(
      { error: "Failed to load categories: " + error.message },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getCurrentUser();
    if (!session) {
      return Response.json({ error: "Not logged in." }, { status: 401 });
    }

    const body = await req.json();
    const { name } = body;

    if (!name || !name.trim()) {
      return Response.json({ error: "Please enter a name!" }, { status: 400 });
    }
    if (name.length > 45) {
      return Response.json(
        {
          error: "Name must be no more than 45 characters!",
        },
        { status: 400 },
      );
    }

    const [rows] = await pool.query<RowDataPacket[]>(
      "SELECT * FROM categories WHERE name = ? AND user_id = ?",
      [name, session.userId],
    );

    if (rows.length > 0) {
      return Response.json(
        { error: "Category already exists!" },
        { status: 400 },
      );
    }

    await pool.query("INSERT INTO categories (name, user_id) VALUES (?, ?)", [
      name,
      session.userId,
    ]);

    return Response.json(
      { message: "Category created successfully" },
      { status: 201 },
    );
  } catch (error: any) {
    return Response.json(
      {
        error: "Failed to create category: " + error.message,
      },
      { status: 500 },
    );
  }
}
