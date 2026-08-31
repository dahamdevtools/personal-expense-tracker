import SideMenu from "@/components/sideMenu";
import { LuUser } from "react-icons/lu";

export default function DashboardLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="w-full max-w-360 h-screen overflow-hidden flex px-3.5 gap-3.5">
      <SideMenu />
      <main className="flex-1 flex flex-col pt-3.5">
        <div className="w-full h-fit flex items-center justify-between gap-4 ps-6 p-3.5 rounded-2xl bg-neutral-50">
          <p className="text-neutral-500">Welcome User!</p>
          <button className="w-10 h-10 aspect-square rounded-full flex items-center justify-center text-xl border-4 border-indigo-200 bg-indigo-400 text-indigo-50">
            <LuUser />
          </button>
        </div>
        <hr className="border-neutral-200 mt-3.5" />
        {children}
      </main>
    </div>
  );
}
