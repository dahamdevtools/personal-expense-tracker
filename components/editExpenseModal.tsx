"use client";

import { LuX } from "react-icons/lu";
import { DatePicker } from "./ui/datePicker";
import { CategorySelect } from "./categorySelect";
import { Expense } from "@/types";
import { useState } from "react";

interface Props {
  expense: Expense;
  onClose: () => void;
  onSuccess: () => void;
}

export default function EditExpenseModal({
  onClose,
  expense,
  onSuccess,
}: Props) {
  const [category, setCategory] = useState<number | null>(expense.category_id);
  const [date, setDate] = useState<Date | undefined>(new Date(expense.date));
  const [amount, setAmount] = useState(expense.amount);
  const [description, setDescription] = useState(expense.description);
  const [saveError, setSaveError] = useState("");
  const [deleteError, setDeleteError] = useState("");
  const [saveLoading, setSaveLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleSave = async () => {
    setSaveError("");
    setDeleteError("");
    setSaveLoading(true);

    try {
      const res = await fetch(`/api/expenses/${expense.id}`, {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          user_id: 2,
          category_id: category,
          amount: Math.floor(parseFloat(amount) * 100) / 100,
          description,
          date,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setSaveError(data.error);
        setSaveLoading(false);
        return;
      }

      onSuccess();
      onClose();
    } catch (error) {
      console.error("Failed to update expense", error);
    } finally {
      setSaveLoading(false);
    }
  };

  const handleDelete = async () => {
    setDeleteError("");
    setSaveError("");
    setDeleteLoading(true);

    try {
      const res = await fetch(`/api/expenses/${expense.id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        setDeleteError(data.error);
        setDeleteLoading(false);
        return;
      }

      onSuccess();
      onClose();
    } catch (error) {
      console.error("Failed to delete expense", error);
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen fixed top-0 left-0 z-10 flex items-center justify-center p-7 bg-neutral-900/5">
      <div className="w-full max-w-sm h-fit flex flex-col rounded-2xl bg-neutral-50">
        <div className="w-full h-fit flex items-center justify-between gap-4 p-4 ps-6">
          <p className="font-semibold text-lg">Edit Expense</p>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl flex items-center justify-center text-lg text-red-400 bg-red-100"
          >
            <LuX />
          </button>
        </div>
        <div className="w-full px-3.5">
          <hr className="border-neutral-200" />
        </div>
        <div className="w-full h-fit flex flex-col gap-4 p-4">
          <div className="w-full h-fit flex flex-col gap-1">
            <label htmlFor="category">Category</label>
            <CategorySelect value={category} onValueChange={setCategory} />
          </div>
          <div className="w-full h-fit flex flex-col gap-1">
            <label htmlFor="amount">Amount</label>
            <div className="w-full h-fit flex items-center gap-2">
              <span className="text-neutral-500">LKR</span>
              <input
                id="amount"
                type="number"
                spellCheck="false"
                className="w-full h-10 rounded-xl px-4 truncate bg-neutral-200/50"
                placeholder="Amount..."
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
          </div>
          <div className="w-full h-fit flex flex-col gap-1">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              placeholder="Description..."
              rows={2}
              spellCheck="false"
              className="w-full rounded-xl px-4 py-3 resize-none bg-neutral-200/50"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="w-full h-fit flex flex-col gap-1">
            <label htmlFor="date">Date</label>
            <DatePicker date={date} onDateChange={setDate} />
          </div>
          {saveError && <p className="text-red-400">{saveError}</p>}
          {deleteError && <p className="text-red-400">{deleteError}</p>}
        </div>
        <div className="w-full h-fit flex flex-wrap justify-end p-4 pt-0 gap-2">
          <button
            disabled={saveLoading}
            onClick={handleSave}
            className="w-fit h-10 disabled:opacity-50 rounded-xl px-5 text-indigo-500 bg-indigo-100"
          >
            {saveLoading ? "Saving..." : "Save"}
          </button>
          <button
            disabled={deleteLoading}
            onClick={handleDelete}
            className="w-fit h-10 disabled:opacity-50 rounded-xl px-5 text-red-500 bg-red-100"
          >
            {deleteLoading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
