import { getCurrentUser } from "@/lib/auth";
import pool from "@/lib/db";
import { format } from "date-fns";
import { NextRequest } from "next/server";

export async function GET() {
  try {
    const session = await getCurrentUser();
    if (!session) {
      return Response.json({ error: "Not logged in." }, { status: 401 });
    }

    const [rows] = await pool.query(
      "SELECT income.id, amount, description, date, category_id, name as category FROM income INNER JOIN categories ON income.category_id = categories.id WHERE income.user_id = ? ORDER BY date DESC",
      [session.userId],
    );
    return Response.json(rows);
  } catch (error: any) {
    return Response.json(
      { error: "Failed to load income: " + error.message },
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
    const { category_id, amount, description, date } = body;
    const formattedDate = format(new Date(date), "yyyy-MM-dd HH:mm:ss");

    if (!category_id || !amount || !amount || !date) {
      return Response.json(
        { error: "All fields are required except description." },
        { status: 400 },
      );
    }

    await pool.query(
      "INSERT INTO income (amount, description, date, category_id, user_id) VALUES (?, ?, ?, ?, ?)",
      [amount, description, formattedDate, category_id, session.userId],
    );

    return Response.json(
      { message: "Income created successfully" },
      { status: 201 },
    );
  } catch (error: any) {
    return Response.json(
      { error: "Failed to create income: " + error.message },
      { status: 500 },
    );
  }
}
