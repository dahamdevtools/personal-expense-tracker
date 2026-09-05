import pool from "@/lib/db";
import { NextRequest } from "next/server";

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    await pool.query("DELETE FROM users WHERE id = ?", [id]);

    return Response.json(
      { message: "User deleted successfully" },
      { status: 200 },
    );
  } catch (error: any) {
    return Response.json(
      { error: "Failed to delete user: " + error.message },
      { status: 500 },
    );
  }
}
