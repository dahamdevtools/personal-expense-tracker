import pool from "@/lib/db";
import { format } from "date-fns";
import { NextRequest } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: number }> },
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { user_id, category_id, amount, description, date } = body;
    const formattedDate = format(new Date(date), "yyyy-MM-dd HH:mm:ss");

    if (!category_id || !amount || !amount || !date) {
      return Response.json(
        { error: "All fields are required except description." },
        { status: 400 },
      );
    }

    await pool.query(
      "UPDATE income SET amount = ?, description = ?, date = ?, category_id = ?, user_id = ? WHERE id = ?",
      [amount, description, formattedDate, category_id, user_id, id],
    );

    return Response.json(
      { message: "Income updated successfully" },
      { status: 201 },
    );
  } catch (error: any) {
    return Response.json(
      { error: "Failed to update income: " + error.message },
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

    await pool.query("DELETE FROM income WHERE id = ?", [id]);

    return Response.json({ message: "Income deleted successfully" });
  } catch (error: any) {
    return Response.json(
      { error: "Failed to delete income: " + error.message },
      { status: 500 },
    );
  }
}
