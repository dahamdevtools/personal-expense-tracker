"use client";

import AddExpenseModal from "@/components/addExpenseModal";
import { useState } from "react";
import { LuPlus } from "react-icons/lu";

export default function Expenses() {
  const [isAddExpenseModalOpen, setIsAddExpenseModalOpen] = useState(false);

  return (
    <div className="w-full flex flex-col gap-7 p-3.5 pt-7">
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
          <tr>
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
          <tr>
            <td className="p-3 px-5">2026.09.01</td>
            <td className="p-3 px-5">Freelancing</td>
            <td className="p-3 px-5">
              <p className="text-ellipsis line-clamp-1">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Excepturi delectus in soluta ullam repellat totam molestias
                sapiente maiores facilis quasi voluptas id ex corporis deleniti
                dolor provident eveniet, omnis quos?
              </p>
            </td>
            <td className="p-2 ps-5">
              <span className="w-fit h-fit flex gap-1 px-4 py-1 rounded-lg bg-green-100 text-green-400">
                <span>+</span>
                <span>$600</span>
              </span>
            </td>
          </tr>
        </tbody>
      </table>

      {isAddExpenseModalOpen && (
        <AddExpenseModal onClose={() => setIsAddExpenseModalOpen(false)} />
      )}
    </div>
  );
}
