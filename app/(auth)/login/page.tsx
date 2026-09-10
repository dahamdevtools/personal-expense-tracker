"use client";

import Link from "next/link";

export default function Login() {
  return (
    <div className="w-full h-full flex-1 flex items-center justify-center p-7 overflow-y-scroll">
      <div className="w-full max-w-sm h-fit flex flex-col items-center p-7 gap-7 rounded-2xl bg-neutral-50">
        <div className="w-full h-fit flex flex-col items-center">
          <p className="text-neutral-500 text-center">Welcome Back!</p>
          <h1 className="text-xl font-semibold text-center">
            Sign in to your Account
          </h1>
        </div>
        <div className="w-full h-fit flex flex-col gap-5">
          <div className="w-full h-fit flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="text"
              spellCheck="false"
              className="w-full h-10 rounded-xl px-4 truncate bg-neutral-200/50"
              placeholder="Enter your Email..."
            />
          </div>
          <div className="w-full h-fit flex flex-col gap-2">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="text"
              spellCheck="false"
              className="w-full h-10 rounded-xl px-4 truncate bg-neutral-200/50"
              placeholder="Enter your Password..."
            />
          </div>
        </div>
        <Link href={"/signup"} className="text-center">
          <span className="text-neutral-500">Don't have an Account?</span>{" "}
          <span className="underline">Sign Up here</span>
        </Link>
        <button className="w-full h-10 disabled:opacity-50 rounded-xl px-5 text-indigo-500 bg-indigo-100">
          Login
        </button>
      </div>
    </div>
  );
}
