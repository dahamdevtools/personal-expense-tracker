"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Category } from "@/types";
import { useEffect, useState } from "react";

interface Props {
  value: number | null;
  onValueChange: (value: number | null) => void;
}

export function CategorySelect({ value, onValueChange }: Props) {
  const [categories, setCategories] = useState<Category[]>([]);

  const fetchCategories = async () => {
    const res = await fetch("/api/categories");
    const data = await res.json();
    setCategories(data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const items = categories.map((category) => ({
    label: category.name,
    value: category.id,
  }));

  return (
    <Select
      items={items}
      value={value}
      onValueChange={(newValue) => onValueChange(newValue ?? null)}
    >
      <SelectTrigger className="w-full h-10! text-base ps-4! pe-3! rounded-xl border-0 bg-neutral-200/50">
        <SelectValue placeholder="Select a category" />
      </SelectTrigger>
      <SelectContent className="ring-0 shadow-xl shadow-neutral-900/5 bg-neutral-50">
        {categories.map((category) => (
          <SelectItem
            className="text-base h-10 rounded-none px-4 focus:bg-neutral-200/50"
            key={category.id}
            value={category.id}
          >
            {category.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
