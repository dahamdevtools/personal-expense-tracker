import { LuX } from "react-icons/lu";
import { DatePicker } from "./ui/datePicker";
import { CategorySelect } from "./categorySelect";

interface Props {
  onClose: () => void;
  id: number;
}

export default function EditExpenseModal({ onClose, id }: Props) {
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
            <CategorySelect />
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
            />
          </div>
          <div className="w-full h-fit flex flex-col gap-1">
            <label htmlFor="date">Date</label>
            <DatePicker />
          </div>
        </div>
        <div className="w-full h-fit flex flex-wrap justify-end p-4 pt-0 gap-2">
          <button className="w-fit h-10 rounded-xl px-5 text-indigo-500 bg-indigo-100">
            Save
          </button>
          <button className="w-fit h-10 rounded-xl px-5 text-red-500 bg-red-100">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
