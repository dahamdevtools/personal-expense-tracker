import pool from "@/lib/db";
import { RowDataPacket } from "mysql2";
import { NextRequest } from "next/server";

export async function GET() {
  try {
    const [rows] = await pool.query("SELECT * FROM categories ORDER BY name");
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
      "SELECT * FROM categories WHERE name = ?",
      [name],
    );

    if (rows.length > 0) {
      return Response.json(
        { error: "Category already exists!" },
        { status: 400 },
      );
    }

    await pool.query("INSERT INTO categories (name) VALUES (?)", [name]);

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
