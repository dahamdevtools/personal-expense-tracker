import { LuX } from "react-icons/lu";

interface Props {
  id: number;
  onClose: () => void;
}

export default function EditCategoryModal({ id, onClose }: Props) {
  return (
    <div className="w-screen h-screen fixed top-0 left-0 z-10 flex items-center justify-center p-7 bg-neutral-900/5">
      <div className="w-full max-w-sm h-fit flex flex-col rounded-2xl bg-neutral-50">
        <div className="w-full h-fit flex items-center justify-between gap-4 p-4 ps-6">
          <p>Edit Category</p>
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
        <div className="p-4">
          <input
            defaultValue={id}
            type="text"
            spellCheck="false"
            className="w-full h-10 rounded-xl px-4 truncate bg-neutral-200/50"
            placeholder="Category name..."
          />
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
