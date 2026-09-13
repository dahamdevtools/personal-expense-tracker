"use client";

import { NavItemTypes } from "@/types/navigation";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  LuArrowLeft,
  LuHandCoins,
  LuLayers,
  LuMenu,
  LuSquareStack,
  LuUser,
  LuWallet,
  LuX,
} from "react-icons/lu";

const NavItems: NavItemTypes[] = [
  { route: "/dashboard", label: "Dashboard", icon: <LuLayers /> },
  { route: "/expenses", label: "Expenses", icon: <LuHandCoins /> },
  { route: "/income", label: "Income", icon: <LuWallet /> },
  { route: "/categories", label: "Categories", icon: <LuSquareStack /> },
  { route: "/profile", label: "Profile", icon: <LuUser /> },
];

export default function MobileMenu() {
  const pathName = usePathname();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [openSlider, setOpenSlider] = useState(false);

  const handleLogout = async () => {
    setLoading(true);

    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/login");
    } catch (error) {
      console.error("Failed to log out", error);
      setLoading(false);
    }
  };

  return (
    <>
      <button className="lg:hidden" onClick={() => setOpenSlider(true)}>
        <LuMenu className="text-lg" />
      </button>

      <div
        className={`w-full h-screen overflow-hidden px-3.5 bg-neutral-50 dark:bg-neutral-900 fixed top-0 left-0 ${
          openSlider ? "translate-x-0" : "translate-x-full"
        } z-50 lg:hidden flex flex-col duration-300 ease-in-out`}
      >
        <div className="w-full h-fit flex items-center justify-between gap-4 py-6 px-4 border-b border-neutral-200">
          <p className="text-lg truncate">Expense Tracker</p>
          <button
            onClick={() => setOpenSlider(false)}
            className="w-8 h-8 rounded-xl flex items-center justify-center text-lg text-red-400 bg-red-100"
          >
            <LuX />
          </button>
        </div>
        <div className="w-full min-h-0 flex-1 flex-col overflow-y-auto p-8">
          {NavItems.map((item, index) => (
            <Link
              key={index}
              href={item.route}
              onClick={() => setOpenSlider(false)}
              className={`${pathName === item.route ? "border-neutral-400/50 text-neutral-600 bg-neutral-200/50" : "border-neutral-200/50 hover:border-neutral-200 text-neutral-400 hover:bg-neutral-100"} transition-colors duration-200 w-full h-12 flex items-center px-4 gap-3 rounded-r-xl border-l-4`}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
        <div className="w-full h-fit flex items-center justify-center py-4 border-t border-neutral-200">
          <button
            onClick={handleLogout}
            disabled={loading}
            className="w-full h-12 disabled:opacity-50 rounded-xl flex items-center px-4 gap-2 duration-200 hover:bg-neutral-200/50"
          >
            <LuArrowLeft className="text-lg" />
            <span>{loading ? "Logging out..." : "Log out"}</span>
          </button>
        </div>
      </div>
    </>
  );
}
