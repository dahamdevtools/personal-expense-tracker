"use client";

import AddExpenseModal from "@/components/addExpenseModal";
import EditExpenseModal from "@/components/editExpenseModal";
import { useState } from "react";
import { LuPlus } from "react-icons/lu";

export default function Expenses() {
  const [isAddExpenseModalOpen, setIsAddExpenseModalOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<null | number>(null);

  return (
    <div className="w-full flex flex-col gap-7 p-3.5 pt-7 overflow-y-auto">
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
          {Array.from({ length: 10 }).map((_, index) => (
            <tr
              className="cursor-pointer"
              key={index}
              onClick={() => setSelectedExpense(index)}
            >
              <td className="p-3 px-5">2026.08.31</td>
              <td className="p-3 px-5">Shopping</td>
              <td className="p-3 px-5">
                <p className="text-ellipsis line-clamp-1">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Aspernatur, ab.
                </p>
              </td>
              <td className="p-2 ps-5">
                <span className="w-fit h-fit flex gap-1 flex-nowrap px-4 py-1 rounded-lg bg-red-100 text-red-400">
                  <span>-</span>
                  <span>$40</span>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isAddExpenseModalOpen && (
        <AddExpenseModal onClose={() => setIsAddExpenseModalOpen(false)} />
      )}
      {selectedExpense !== null && (
        <EditExpenseModal
          id={selectedExpense}
          onClose={() => setSelectedExpense(null)}
        />
      )}
    </div>
  );
}
