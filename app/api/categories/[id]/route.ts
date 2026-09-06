import pool from "@/lib/db";
import { RowDataPacket } from "mysql2";
import { NextRequest } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
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
      "SELECT * FROM categories WHERE name = ? AND id != ?",
      [name, id],
    );

    if (rows.length > 0) {
      return Response.json(
        { error: "Category already exists!" },
        { status: 400 },
      );
    }

    await pool.query("UPDATE categories SET name = ? WHERE id = ?", [name, id]);

    return Response.json({ message: "Category updated successfully" });
  } catch (error: any) {
    return Response.json(
      { error: "Failed to update category: " + error.message },
      { status: 500 },
    );
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    await pool.query("DELETE FROM categories WHERE id = ?", [id]);

    return Response.json({ message: "Category deleted successfully" });
  } catch (error: any) {
    return Response.json(
      { error: "Failed to delete category: " + error.message },
      { status: 500 },
    );
  }
}
