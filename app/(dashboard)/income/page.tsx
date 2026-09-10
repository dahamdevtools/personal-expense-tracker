"use client";

import AddIncomeModal from "@/components/addIncomeModal";
import EditIncomeModal from "@/components/editIncomeModal";
import type { Income } from "@/types";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";

export default function Income() {
  const [income, setIncome] = useState<Income[]>([]);
  const [loading, setLoading] = useState(false);
  const [isAddIncomeModalOpen, setIsAddIncomeModalOpen] = useState(false);
  const [selectedIncome, setSelectedIncome] = useState<Income | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchIncome = async () => {
    setLoading(true);

    try {
      const res = await fetch("/api/income");
      const data = await res.json();
      setIncome(data);
    } catch (error) {
      console.error("Failed to fetch income", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredIncome = income.filter((inc) => {
    const term = searchTerm.toLocaleLowerCase();
    const date = format(new Date(inc.date), "MMM dd, yyyy");
    return (
      inc.description.toLowerCase().includes(term) ||
      inc.category.toLowerCase().includes(term) ||
      date.toLowerCase().includes(term)
    );
  });

  useEffect(() => {
    fetchIncome();
  }, []);

  return (
    <div className="w- h-full flex flex-col gap-7 p-3.5 pt-7 overflow-y-auto">
      <div className="w-full h-fit flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-xl">Income History</h1>
        <div className="w-fit h-fit flex flex-wrap items-center gap-2">
          <input
            type="text"
            spellCheck="false"
            placeholder="Search Income..."
            className="w-full sm:max-w-64 h-10 rounded-xl px-4 truncate bg-neutral-200"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            onClick={() => setIsAddIncomeModalOpen(true)}
            className="w-fit h-10 px-3 gap-2 pe-5 flex items-center rounded-xl text-indigo-500 bg-indigo-100"
          >
            <LuPlus className="text-lg" />
            <span>Add Income</span>
          </button>
        </div>
      </div>

      {loading ? (
        <div className="w-full h-full p-7 text-lg flex items-center justify-center">
          <p>Loading...</p>
        </div>
      ) : income.length === 0 ? (
        <div className="w-full h-full p-7 text-lg flex items-center justify-center">
          <p>No income yet.</p>
        </div>
      ) : filteredIncome.length === 0 ? (
        <div className="w-full h-full p-7 text-lg flex items-center justify-center">
          <p>No expense found.</p>
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
            {filteredIncome.map((inc) => (
              <tr
                className="cursor-pointer"
                key={inc.id}
                onClick={() => setSelectedIncome(inc)}
              >
                <td className="p-3 px-5">
                  {format(new Date(inc.date), "MMM dd, yyyy")}
                </td>
                <td className="p-3 px-5">{inc.category}</td>
                <td className="p-3 px-5">
                  <p className="text-ellipsis line-clamp-1">
                    {inc.description}
                  </p>
                </td>
                <td className="p-2 ps-5">
                  <span className="w-fit h-fit flex gap-1 flex-nowrap px-4 py-1 rounded-lg bg-green-100 text-green-500">
                    <span>+</span>
                    <span>LKR {inc.amount}</span>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {isAddIncomeModalOpen && (
        <AddIncomeModal
          onClose={() => setIsAddIncomeModalOpen(false)}
          onSuccess={fetchIncome}
        />
      )}
      {selectedIncome !== null && (
        <EditIncomeModal
          income={selectedIncome}
          onClose={() => setSelectedIncome(null)}
          onSuccess={fetchIncome}
        />
      )}
    </div>
  );
}
