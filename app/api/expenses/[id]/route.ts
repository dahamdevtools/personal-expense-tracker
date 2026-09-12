import { getCurrentUser } from "@/lib/auth";
import pool from "@/lib/db";
import { format } from "date-fns";
import { NextRequest } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: number }> },
) {
  try {
    const session = await getCurrentUser();
    if (!session) {
      return Response.json({ error: "Not logged in." }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();
    const { category_id, amount, description, date } = body;
    const formattedDate = format(new Date(date), "yyyy-MM-dd HH:mm:ss");

    if (!category_id || !amount || !amount || !date) {
      return Response.json(
        { error: "All fields are required except description." },
        { status: 400 },
      );
    }

    const [rows]: any = await pool.query(
      "UPDATE expenses SET amount = ?, description = ?, date = ?, category_id = ? WHERE id = ? AND user_id = ?",
      [amount, description, formattedDate, category_id, id, session.userId],
    );

    if (rows.affectedRows === 0) {
      return Response.json({ error: "Expense not found." }, { status: 404 });
    }

    return Response.json(
      { message: "Expense updated successfully" },
      { status: 201 },
    );
  } catch (error: any) {
    return Response.json(
      { error: "Failed to update expense: " + error.message },
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
      "DELETE FROM expenses WHERE id = ? AND user_id = ?",
      [id, session.userId],
    );

    if (rows.affectedRows === 0) {
      return Response.json({ error: "Expense not found." }, { status: 404 });
    }

    return Response.json({ message: "Expense deleted successfully" });
  } catch (error: any) {
    return Response.json(
      { error: "Failed to delete expense: " + error.message },
      { status: 500 },
    );
  }
}
