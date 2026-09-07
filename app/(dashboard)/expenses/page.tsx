"use client";

import AddExpenseModal from "@/components/addExpenseModal";
import EditExpenseModal from "@/components/editExpenseModal";
import { Expense } from "@/types";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";

export default function Expenses() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(false);
  const [isAddExpenseModalOpen, setIsAddExpenseModalOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);

  const fetchExpenses = async () => {
    setLoading(true);

    try {
      const res = await fetch("/api/expenses");
      const data = await res.json();
      setExpenses(data);
    } catch (error) {
      console.error("Failed to fetch expenses", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div className="w-full h-full flex flex-col gap-7 p-3.5 pt-7 overflow-y-auto">
      <div className="w-full h-fit flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-xl">Expenses</h1>
        <div className="w-fit h-fit flex flex-wrap items-center gap-2">
          <input
            type="text"
            spellCheck="false"
            placeholder="Search Expenses..."
            className="w-full sm:max-w-64 h-10 rounded-xl px-4 truncate bg-neutral-200"
          />
          <button
            onClick={() => setIsAddExpenseModalOpen(true)}
            className="w-fit h-10 px-3 gap-2 pe-5 flex items-center rounded-xl text-indigo-500 bg-indigo-100"
          >
            <LuPlus className="text-lg" />
            <span>Add Expense</span>
          </button>
        </div>
      </div>

      {loading ? (
        <div className="w-full h-full p-7 text-lg flex items-center justify-center">
          <p>Loading...</p>
        </div>
      ) : expenses.length === 0 ? (
        <div className="w-full h-full p-7 text-lg flex items-center justify-center">
          <p>No expense yet.</p>
        </div>
      ) : (
        <table className="bg-neutral-50 rounded-2xl overflow-hidden">
          <thead>
            <tr className="bg-neutral-200">
              <th className="font-normal text-start p-3 px-5">Date</th>
              <th className="font-normal text-start p-3 px-5">Category</th>
              <th className="font-normal text-start p-3 px-5">Description</th>
              <th className="font-normal text-start p-3 px-5">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {expenses.map((expense) => (
              <tr
                className="cursor-pointer"
                key={expense.id}
                onClick={() => setSelectedExpense(expense)}
              >
                <td className="p-3 px-5">
                  {format(new Date(expense.date), "MMM dd, yyyy")}
                </td>
                <td className="p-3 px-5">{expense.category}</td>
                <td className="p-3 px-5">
                  <p className="text-ellipsis line-clamp-1">
                    {expense.description}
                  </p>
                </td>
                <td className="p-2 ps-5">
                  <span className="w-fit h-fit flex gap-1 flex-nowrap px-4 py-1 rounded-lg bg-red-100 text-red-400">
                    <span>-</span>
                    <span>LKR {expense.amount}</span>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {isAddExpenseModalOpen && (
        <AddExpenseModal
          onClose={() => setIsAddExpenseModalOpen(false)}
          onSuccess={fetchExpenses}
        />
      )}
      {selectedExpense !== null && (
        <EditExpenseModal
          expense={selectedExpense}
          onClose={() => setSelectedExpense(null)}
          onSuccess={fetchExpenses}
        />
      )}
    </div>
  );
}
