"use client";

import { useState } from "react";

export default function Profile() {
  const [saveLoading, setSaveLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSave = async () => {};

  const handleDelete = async () => {};

  return (
    <div className="w-full h-full flex flex-col gap-7 p-3.5 pt-7 overflow-y-auto">
      <h1 className="text-xl">Edit Profile</h1>
      <div className="w-full max-w-sm h-fit flex flex-col gap-5 rounded-2xl p-7 bg-neutral-50">
        <div className="w-full h-fit flex flex-col gap-2">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            spellCheck="false"
            className="w-full h-10 rounded-xl px-4 truncate bg-neutral-200/50"
            placeholder="Enter your Name..."
          />
        </div>
        <div className="w-full h-fit flex flex-col gap-2">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="text"
            spellCheck="false"
            className="w-full h-10 disabled:opacity-50 rounded-xl px-4 truncate bg-neutral-200/50"
            placeholder="Enter your Email..."
            disabled={true}
          />
        </div>
        <div className="w-full h-fit flex flex-col gap-2">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            spellCheck="false"
            className="w-full h-10 disabled:opacity-50 rounded-xl px-4 truncate bg-neutral-200/50"
            placeholder="Enter your Password..."
            disabled={true}
          />
        </div>
        <div className="w-full h-fit flex flex-col gap-2">
          <label htmlFor="currency">Prefered Currency</label>
          <input
            id="currency"
            type="text"
            spellCheck="false"
            className="w-full h-10 rounded-xl px-4 truncate bg-neutral-200/50"
            placeholder="USD, AUD, LKR, $..."
          />
        </div>
        <button
          onClick={handleSave}
          disabled={saveLoading}
          className="w-full h-10 disabled:opacity-50 rounded-xl px-5 text-indigo-500 bg-indigo-100"
        >
          {saveLoading ? "Saving..." : "Save Profile"}
        </button>
        <button
          disabled={deleteLoading}
          onClick={handleDelete}
          className="w-full h-10 disabled:opacity-50 rounded-xl px-5 text-red-500 bg-red-100"
        >
          {deleteLoading ? "Deleting..." : "Delete Profile"}
        </button>
      </div>
    </div>
  );
}
