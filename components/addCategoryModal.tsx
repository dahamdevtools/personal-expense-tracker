"use client";

import { useState } from "react";
import { LuX } from "react-icons/lu";

interface Props {
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddCategoryModal({ onClose, onSuccess }: Props) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ name }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error);
        return;
      }

      onSuccess();
      onClose();
    } catch (error) {
      console.error("Failed to add category", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen fixed top-0 left-0 z-10 flex items-center justify-center p-7 bg-neutral-900/5">
      <div className="w-full max-w-sm h-fit flex flex-col rounded-2xl bg-neutral-50">
        <div className="w-full h-fit flex items-center justify-between gap-4 p-4 ps-6">
          <p className="text-lg font-semibold">Add Category</p>
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
        <div className="w-full h-fit flex flex-col gap-2 p-4">
          <input
            type="text"
            spellCheck="false"
            className="w-full h-10 rounded-xl px-4 truncate bg-neutral-200/50"
            placeholder="Category name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {error && <p className="text-red-400">{error}</p>}
        </div>
        <div className="w-full h-fit flex justify-end p-4 pt-0">
          <button
            disabled={loading}
            onClick={handleAdd}
            className="w-fit h-10 rounded-xl px-5 disabled:opacity-50 text-indigo-500 bg-indigo-100"
          >
            {loading ? "Adding..." : "Add Category"}
          </button>
        </div>
      </div>
    </div>
  );
}
