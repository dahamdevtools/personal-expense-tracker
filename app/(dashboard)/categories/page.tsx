"use client";

import AddCategoryModal from "@/components/addCategoryModal";
import EditCategoryModal from "@/components/editCategoryModal";
import { useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";

interface Category {
  id: number;
  name: string;
}

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );
  const [searchTerm, setSearchTerm] = useState("");

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/categories");
      const data = await res.json();
      setCategories(data);
    } catch (error) {
      console.error("Failed to fetch categories", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCategories = categories.filter((category) => {
    const term = searchTerm.toLocaleLowerCase();
    return category.name.toLowerCase().includes(term);
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="w-full h-full flex flex-col gap-7 p-3.5 pt-7 overflow-y-auto">
      <div className="w-full h-fit flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-xl">Categories</h1>
        <div className="w-fit h-fit flex flex-wrap items-center gap-2">
          <input
            type="text"
            spellCheck="false"
            placeholder="Search Category..."
            className="w-full sm:max-w-64 h-10 rounded-xl px-4 truncate bg-neutral-200"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            onClick={() => setIsAddCategoryModalOpen(true)}
            className="w-fit h-10 px-3 gap-2 pe-5 flex items-center rounded-xl text-indigo-500 bg-indigo-100"
          >
            <LuPlus className="text-lg" />
            <span>Add Category</span>
          </button>
        </div>
      </div>
      {loading ? (
        <div className="w-full h-full p-7 text-lg flex items-center justify-center">
          <p>Loading...</p>
        </div>
      ) : categories.length === 0 ? (
        <div className="w-full h-full p-7 text-lg flex items-center justify-center">
          <p>No categories yet.</p>
        </div>
      ) : filteredCategories.length === 0 ? (
        <div className="w-full h-full p-7 text-lg flex items-center justify-center">
          <p>No categories found.</p>
        </div>
      ) : (
        <div className="w-full h-full flex flex-wrap gap-2">
          {filteredCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category)}
              className="w-fit h-10 rounded-xl px-5 bg-neutral-200"
            >
              {category.name}
            </button>
          ))}
        </div>
      )}
      {isAddCategoryModalOpen && (
        <AddCategoryModal
          onClose={() => setIsAddCategoryModalOpen(false)}
          onSuccess={fetchCategories}
        />
      )}
      {selectedCategory !== null && (
        <EditCategoryModal
          category={selectedCategory}
          onClose={() => setSelectedCategory(null)}
          onSuccess={fetchCategories}
        />
      )}
    </div>
  );
}
