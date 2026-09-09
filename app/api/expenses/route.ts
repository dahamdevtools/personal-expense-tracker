import pool from "@/lib/db";
import { format } from "date-fns";
import { NextRequest } from "next/server";

export async function GET() {
  try {
    const [rows] = await pool.query(
      "SELECT expenses.id, amount, description, date, category_id, name as category FROM expenses INNER JOIN categories ON expenses.category_id = categories.id ORDER BY date DESC",
    );
    return Response.json(rows);
  } catch (error: any) {
    return Response.json(
      { error: "Failed to load expenses: " + error.message },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
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
      "INSERT INTO expenses (amount, description, date, category_id, user_id) VALUES (?, ?, ?, ?, ?)",
      [amount, description, formattedDate, category_id, user_id],
    );

    return Response.json(
      { message: "Expense created successfully" },
      { status: 201 },
    );
  } catch (error: any) {
    return Response.json(
      { error: "Failed to create expense: " + error.message },
      { status: 500 },
    );
  }
}
