import pool from "@/lib/db";
import { format } from "date-fns";
import { NextRequest } from "next/server";

export async function PUT(req: NextRequest) {
  try {
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
      "UPDATE expenses SET (amount, description, date, category_id, user_id) VALUES (?, ?, ?, ?, ?)",
      [amount, description, formattedDate, category_id, user_id],
    );

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
