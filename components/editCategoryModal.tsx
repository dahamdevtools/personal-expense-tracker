"use client";

import { useState } from "react";
import { LuX } from "react-icons/lu";

interface Category {
  id: number;
  name: string;
}

interface Props {
  category: Category;
  onClose: () => void;
  onSuccess: () => void;
}

export default function EditCategoryModal({
  category,
  onClose,
  onSuccess,
}: Props) {
  const [name, setName] = useState(category.name);
  const [saveError, setSaveError] = useState("");
  const [deleteError, setDeleteError] = useState("");
  const [saveLoading, setSaveLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleSave = async () => {
    setSaveError("");
    setDeleteError("");
    setSaveLoading(true);

    try {
      const res = await fetch(`/api/categories/${category.id}`, {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ name }),
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
      console.error("Failed to save category", error);
    } finally {
      setSaveLoading(false);
    }
  };

  const handleDelete = async () => {
    setDeleteError("");
    setSaveError("");
    setDeleteLoading(true);

    try {
      const res = await fetch(`/api/categories/${category.id}`, {
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
      console.error("Failed to delete category", error);
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen fixed top-0 left-0 z-10 flex items-center justify-center p-7 bg-neutral-900/5">
      <div className="w-full max-w-sm h-fit flex flex-col rounded-2xl bg-neutral-50">
        <div className="w-full h-fit flex items-center justify-between gap-4 p-4 ps-6">
          <p className="text-lg font-semibold">Edit Category</p>
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
          {saveError && <p className="text-red-400">{saveError}</p>}
          {deleteError && <p className="text-red-400">{deleteError}</p>}
        </div>
        <div className="w-full h-fit flex flex-wrap justify-end p-4 pt-0 gap-2">
          <button
            disabled={saveLoading}
            onClick={handleSave}
            className="w-fit h-10 rounded-xl px-5 disabled:opacity-50 text-indigo-500 bg-indigo-100"
          >
            {saveLoading ? "Saving..." : "Save"}
          </button>
          <button
            disabled={deleteLoading}
            onClick={handleDelete}
            className="w-fit h-10 rounded-xl px-5 disabled:opacity-50 text-red-500 bg-red-100"
          >
            {deleteLoading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
