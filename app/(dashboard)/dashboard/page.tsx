"use client";

import { SessionPayload } from "@/lib/auth";
import { Expense, Income } from "@/types";
import { format } from "date-fns";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  LuArrowRight,
  LuBanknote,
  LuHandCoins,
  LuWallet,
} from "react-icons/lu";

export default function Dashboard() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [income, setIncome] = useState<Income[]>([]);
  const [expenseLoading, setExpenseLoading] = useState(false);
  const [incomeLoading, setIncomeLoading] = useState(false);
  const [user, setUser] = useState<SessionPayload | null>(null);

  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpenses] = useState(0);

  const fetchUser = async () => {
    try {
      const res = await fetch("api/auth/me");
      if (!res.ok) return;
      const data = await res.json();
      setUser(data);
    } catch (error) {
      console.error("Failed to fetch user", error);
    }
  };

  const fetchExpenses = async () => {
    setExpenseLoading(true);

    try {
      const res = await fetch("/api/expenses");
      const data = await res.json();
      setExpenses(data);

      let sum = 0;
      for (const exp of data) {
        sum += Math.floor(exp.amount * 100);
      }

      setTotalExpenses(sum / 100);
    } catch (error) {
      console.error("Failed to fetch expenses", error);
    } finally {
      setExpenseLoading(false);
    }
  };

  const fetchIncome = async () => {
    setIncomeLoading(true);

    try {
      const res = await fetch("/api/income");
      const data = await res.json();
      setIncome(data);

      let sum = 0;
      for (const inc of data) {
        sum += Math.floor(inc.amount * 100);
      }

      setTotalIncome(sum / 100);
    } catch (error) {
      console.error("Failed to fetch income", error);
    } finally {
      setIncomeLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchExpenses();
    fetchIncome();
  }, []);

  return (
    <div className="w-full min-h-0 min-w-0 flex flex-col gap-7 p-3.5 pt-7 overflow-y-auto">
      <h1 className="text-xl">Dashboard</h1>
      <div className="w-full h-fit grid grid-cols-1 md:grid-cols-3 gap-3.5">
        <div className="w-full h-fit flex items-center p-6 gap-6 rounded-2xl bg-neutral-50">
          <div className="w-16 h-16 aspect-square rounded-full flex items-center justify-center border-6 border-indigo-200 bg-indigo-300 text-neutral-50 text-2xl">
            <LuBanknote />
          </div>
          <div className="w-full min-w-0 h-fit flex flex-col gap-3">
            <p className="text-neutral-500 text-ellipsis line-clamp-1">
              Total Balance
            </p>
            <div className="font-semibold flex flex-wrap gap-2 items-end">
              <span className="text-neutral-400">{user?.currency}</span>
              <span
                className={`${totalIncome - totalExpense > 0 ? "text-green-500" : "text-red-400"} text-3xl text-ellipsis line-clamp-1`}
              >
                {(totalIncome - totalExpense).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
        <div className="w-full h-fit flex items-center p-6 gap-6 rounded-2xl bg-neutral-50">
          <div className="w-16 h-16 aspect-square rounded-full flex items-center justify-center border-6 border-orange-200 bg-orange-300 text-neutral-50 text-2xl">
            <LuWallet />
          </div>
          <div className="w-full min-w-0 h-fit flex flex-col gap-3">
            <p className="text-neutral-500 text-ellipsis line-clamp-1">
              Total Income
            </p>
            <div className="font-semibold flex flex-wrap gap-2 items-end">
              <span className="text-neutral-400">{user?.currency}</span>
              <span className="text-3xl text-ellipsis line-clamp-1">
                {totalIncome.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
        <div className="w-full h-fit flex items-center p-6 gap-6 rounded-2xl bg-neutral-50">
          <div className="w-16 h-16 aspect-square rounded-full flex items-center justify-center border-6 border-red-200 bg-red-300 text-neutral-50 text-2xl">
            <LuHandCoins />
          </div>
          <div className="w-full min-w-0 h-fit flex flex-col gap-3">
            <p className="text-neutral-500 text-ellipsis line-clamp-1">
              Total Expenses
            </p>
            <div className="font-semibold flex flex-wrap gap-2 items-end">
              <span className="text-neutral-400">{user?.currency}</span>
              <span className="text-3xl text-ellipsis line-clamp-1">
                {totalExpense.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-fit flex items-center justify-between gap-6">
        <h3 className="text-lg font-semibold">Recent Income</h3>
        <Link
          href={"/income"}
          className="w-fit h-10 px-3 gap-2 ps-5 flex items-center rounded-xl bg-neutral-200"
        >
          <span>See All</span>
          <LuArrowRight className="text-lg" />
        </Link>
      </div>
      {incomeLoading ? (
        <div className="w-full h-full p-7 text-lg flex items-center justify-center">
          <p>Loading...</p>
        </div>
      ) : income.length === 0 ? (
        <div className="w-full h-full p-7 text-lg flex items-center justify-center">
          <p>No income yet.</p>
        </div>
      ) : (
        <div className="w-full shrink-0 overflow-auto rounded-2xl">
          <table className="min-w-full bg-neutral-50">
            <thead>
              <tr className="bg-neutral-200">
                <th className="font-normal text-start p-3 px-5">Date</th>
                <th className="font-normal text-start p-3 px-5">Category</th>
                <th className="font-normal text-start p-3 px-5">Description</th>
                <th className="font-normal text-start p-3 px-5">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {income
                .map((inc) => (
                  <tr key={inc.id}>
                    <td className="p-3 px-5 text-nowrap">
                      {format(new Date(inc.date), "MMM dd, yyyy")}
                    </td>
                    <td className="p-3 px-5">
                      <p className="text-ellipsis line-clamp-2">
                        {inc.category}
                      </p>
                    </td>
                    <td className="p-3 px-5">
                      <p className="text-ellipsis line-clamp-2">
                        {inc.description}
                      </p>
                    </td>
                    <td className="p-2 ps-5 text-nowrap">
                      <span className="w-fit h-fit flex gap-1 flex-nowrap px-4 py-1 rounded-lg bg-green-100 text-green-500">
                        <span>+</span>
                        <span>
                          {user?.currency} {inc.amount}
                        </span>
                      </span>
                    </td>
                  </tr>
                ))
                .slice(0, 10)}
            </tbody>
          </table>
        </div>
      )}

      <div className="w-full h-fit flex items-center justify-between gap-6">
        <h3 className="text-lg font-semibold">Recent Expenses</h3>
        <Link
          href={"/expenses"}
          className="w-fit h-10 px-3 gap-2 ps-5 flex items-center rounded-xl bg-neutral-200"
        >
          <span>See All</span>
          <LuArrowRight className="text-lg" />
        </Link>
      </div>
      {expenseLoading ? (
        <div className="w-full h-full p-7 text-lg flex items-center justify-center">
          <p>Loading...</p>
        </div>
      ) : expenses.length === 0 ? (
        <div className="w-full h-full p-7 text-lg flex items-center justify-center">
          <p>No expense yet.</p>
        </div>
      ) : (
        <div className="w-full shrink-0 overflow-x-auto rounded-2xl">
          <table className="min-w-full bg-neutral-50">
            <thead>
              <tr className="bg-neutral-200">
                <th className="font-normal text-start p-3 px-5">Date</th>
                <th className="font-normal text-start p-3 px-5">Category</th>
                <th className="font-normal text-start p-3 px-5">Description</th>
                <th className="font-normal text-start p-3 px-5">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {expenses
                .map((expense) => (
                  <tr key={expense.id}>
                    <td className="p-3 px-5 text-nowrap">
                      {format(new Date(expense.date), "MMM dd, yyyy")}
                    </td>
                    <td className="p-3 px-5">
                      <p className="text-ellipsis line-clamp-2">
                        {expense.category}
                      </p>
                    </td>
                    <td className="p-3 px-5">
                      <p className="text-ellipsis line-clamp-2">
                        {expense.description}
                      </p>
                    </td>
                    <td className="p-2 ps-5 text-nowrap">
                      <span className="w-fit h-fit flex gap-1 flex-nowrap px-4 py-1 rounded-lg bg-red-100 text-red-400">
                        <span>-</span>
                        <span>
                          {user?.currency} {expense.amount}
                        </span>
                      </span>
                    </td>
                  </tr>
                ))
                .slice(0, 10)}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
