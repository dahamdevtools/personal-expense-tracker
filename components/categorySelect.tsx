import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const items = [
  { label: "Select a fruit", value: null },
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Blueberry", value: "blueberry" },
  { label: "Grapes", value: "grapes" },
  { label: "Pineapple", value: "pineapple" },
];

export function CategorySelect() {
  return (
    <Select items={items}>
      <SelectTrigger className="w-full h-10! text-base ps-4! pe-3! rounded-xl border-0 bg-neutral-200/50">
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="ring-0 shadow-xl shadow-neutral-900/5 bg-neutral-50">
        {items.map((item) => (
          <SelectItem
            className="text-base h-10 rounded-none px-4 focus:bg-neutral-200/50"
            key={item.value}
            value={item.value}
          >
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
