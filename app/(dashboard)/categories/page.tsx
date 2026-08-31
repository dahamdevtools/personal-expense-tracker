import { LuPlus } from "react-icons/lu";

export default function Categories() {
  return (
    <div className="w-full flex flex-col gap-7 p-3.5 pt-7">
      <h1 className="text-xl">Categories</h1>
      <button className="w-fit h-12 px-3 gap-2 pe-5 flex items-center rounded-xl text-indigo-500 bg-indigo-100">
        <LuPlus className="text-lg" />
        <span>Add Category</span>
      </button>
    </div>
  );
}
