import {
  LuArrowRight,
  LuBanknote,
  LuHandCoins,
  LuWallet,
} from "react-icons/lu";

export default function Dashboard() {
  return (
    <div className="w-full flex flex-col gap-7 p-3.5 pt-7 overflow-y-auto">
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
            <p className="text-3xl font-semibold text-ellipsis line-clamp-1">
              $91,000
            </p>
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
            <p className="text-3xl font-semibold text-ellipsis line-clamp-1">
              $98,200
            </p>
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
            <p className="text-3xl font-semibold text-ellipsis line-clamp-1">
              $7,100
            </p>
          </div>
        </div>
      </div>
      <h3 className="text-lg font-semibold">Recent Transactions</h3>
      <table className="bg-neutral-50 rounded-2xl overflow-hidden">
        <thead>
          <tr className="bg-neutral-200">
            <th className="font-normal text-start p-3 px-5">Date</th>
            <th className="font-normal text-start p-3 px-5">Category</th>
            <th className="font-normal text-start p-3 px-5">Description</th>
            <th className="font-normal text-start p-3 px-5">Amount</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-200">
          <tr>
            <td className="p-3 px-5">2026.08.31</td>
            <td className="p-3 px-5">Shopping</td>
            <td className="p-3 px-5">
              <p className="text-ellipsis line-clamp-1">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Aspernatur, ab.
              </p>
            </td>
            <td className="p-2 ps-5">
              <span className="w-fit h-fit flex gap-1 flex-nowrap px-4 py-1 rounded-lg bg-red-100 text-red-400">
                <span>-</span>
                <span>$40</span>
              </span>
            </td>
          </tr>
          <tr>
            <td className="p-3 px-5">2026.09.01</td>
            <td className="p-3 px-5">Freelancing</td>
            <td className="p-3 px-5">
              <p className="text-ellipsis line-clamp-1">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Excepturi delectus in soluta ullam repellat totam molestias
                sapiente maiores facilis quasi voluptas id ex corporis deleniti
                dolor provident eveniet, omnis quos?
              </p>
            </td>
            <td className="p-2 ps-5">
              <span className="w-fit h-fit flex px-4 py-1 rounded-lg bg-green-100 text-green-400">
                <span>+</span>
                <span>$600</span>
              </span>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="w-full h-fit flex items-center justify-between gap-6">
        <h3 className="text-lg font-semibold">Recent Income</h3>
        <button className="w-fit h-10 px-3 gap-2 ps-5 flex items-center rounded-xl bg-neutral-200">
          <span>See All</span>
          <LuArrowRight className="text-lg" />
        </button>
      </div>
      <table className="bg-neutral-50 rounded-2xl overflow-hidden">
        <thead>
          <tr className="bg-neutral-200">
            <th className="font-normal text-start p-3 px-5">Date</th>
            <th className="font-normal text-start p-3 px-5">Category</th>
            <th className="font-normal text-start p-3 px-5">Description</th>
            <th className="font-normal text-start p-3 px-5">Amount</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-200">
          <tr>
            <td className="p-3 px-5">2026.08.31</td>
            <td className="p-3 px-5">Shopping</td>
            <td className="p-3 px-5">
              <p className="text-ellipsis line-clamp-1">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Aspernatur, ab.
              </p>
            </td>
            <td className="p-2 ps-5">
              <span className="w-fit h-fit flex gap-1 flex-nowrap px-4 py-1 rounded-lg bg-red-100 text-red-400">
                <span>-</span>
                <span>$40</span>
              </span>
            </td>
          </tr>
          <tr>
            <td className="p-3 px-5">2026.09.01</td>
            <td className="p-3 px-5">Freelancing</td>
            <td className="p-3 px-5">
              <p className="text-ellipsis line-clamp-1">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Excepturi delectus in soluta ullam repellat totam molestias
                sapiente maiores facilis quasi voluptas id ex corporis deleniti
                dolor provident eveniet, omnis quos?
              </p>
            </td>
            <td className="p-2 ps-5">
              <span className="w-fit h-fit flex px-4 py-1 rounded-lg bg-green-100 text-green-400">
                <span>+</span>
                <span>$600</span>
              </span>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="w-full h-fit flex items-center justify-between gap-6">
        <h3 className="text-lg font-semibold">Recent Expenses</h3>
        <button className="w-fit h-10 px-3 gap-2 ps-5 flex items-center rounded-xl bg-neutral-200">
          <span>See All</span>
          <LuArrowRight className="text-lg" />
        </button>
      </div>
      <table className="bg-neutral-50 rounded-2xl overflow-hidden">
        <thead>
          <tr className="bg-neutral-200">
            <th className="font-normal text-start p-3 px-5">Date</th>
            <th className="font-normal text-start p-3 px-5">Category</th>
            <th className="font-normal text-start p-3 px-5">Description</th>
            <th className="font-normal text-start p-3 px-5">Amount</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-200">
          <tr>
            <td className="p-3 px-5">2026.08.31</td>
            <td className="p-3 px-5">Shopping</td>
            <td className="p-3 px-5">
              <p className="text-ellipsis line-clamp-1">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Aspernatur, ab.
              </p>
            </td>
            <td className="p-2 ps-5">
              <span className="w-fit h-fit flex gap-1 flex-nowrap px-4 py-1 rounded-lg bg-red-100 text-red-400">
                <span>-</span>
                <span>$40</span>
              </span>
            </td>
          </tr>
          <tr>
            <td className="p-3 px-5">2026.09.01</td>
            <td className="p-3 px-5">Freelancing</td>
            <td className="p-3 px-5">
              <p className="text-ellipsis line-clamp-1">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Excepturi delectus in soluta ullam repellat totam molestias
                sapiente maiores facilis quasi voluptas id ex corporis deleniti
                dolor provident eveniet, omnis quos?
              </p>
            </td>
            <td className="p-2 ps-5">
              <span className="w-fit h-fit flex px-4 py-1 rounded-lg bg-green-100 text-green-400">
                <span>+</span>
                <span>$600</span>
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
