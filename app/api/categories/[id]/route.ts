import { getCurrentUser } from "@/lib/auth";
import pool from "@/lib/db";
import { RowDataPacket } from "mysql2";
import { NextRequest } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await getCurrentUser();
    if (!session) {
      return Response.json({ error: "Not logged in." }, { status: 401 });
    }

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

    const [result]: any = await pool.query(
      "UPDATE categories SET name = ? WHERE id = ? AND user_id = ?",
      [name, id, session.userId],
    );

    if (result.affectedRows === 0) {
      return Response.json({ error: "Category not found." }, { status: 404 });
    }

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
    const session = await getCurrentUser();
    if (!session) {
      return Response.json({ error: "Not logged in." }, { status: 401 });
    }

    const { id } = await params;

    const [rows]: any = await pool.query(
      "DELETE FROM categories WHERE id = ? AND user_id = ?",
      [id, session.userId],
    );

    if (rows.affectedRows === 0) {
      return Response.json({ error: "Category not found." }, { status: 404 });
    }

    return Response.json({ message: "Category deleted successfully" });
  } catch (error: any) {
    return Response.json(
      { error: "Failed to delete category: " + error.message },
      { status: 500 },
    );
  }
}
