"use client";

import AddCategoryModal from "@/components/addCategoryModal";
import EditCategoryModal from "@/components/editCategoryModal";
import { useState } from "react";
import { LuPlus } from "react-icons/lu";

export default function Categories() {
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  return (
    <div className="w-full flex flex-col gap-7 p-3.5 pt-7 overflow-y-auto">
      <div className="w-full h-fit flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-xl">Categories</h1>
        <button
          onClick={() => setIsAddCategoryModalOpen(true)}
          className="w-fit h-10 px-3 gap-2 pe-5 flex items-center rounded-xl text-indigo-500 bg-indigo-100"
        >
          <LuPlus className="text-lg" />
          <span>Add Category</span>
        </button>
      </div>
      <div className="w-full h-fit flex flex-wrap gap-2">
        {Array.from({ length: 20 }).map((_, index) => (
          <button
            key={index}
            onClick={() => setSelectedCategory(index)}
            className="w-fit h-10 rounded-xl px-5 bg-neutral-200"
          >
            {"Category " + (index + 1)}
          </button>
        ))}
      </div>
      {isAddCategoryModalOpen && (
        <AddCategoryModal onClose={() => setIsAddCategoryModalOpen(false)} />
      )}
      {selectedCategory !== null && (
        <EditCategoryModal
          id={selectedCategory}
          onClose={() => setSelectedCategory(null)}
        />
      )}
    </div>
  );
}
