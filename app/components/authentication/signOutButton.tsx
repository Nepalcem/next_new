"use client";
import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <button
      className="bg-fuchsia-300 rounded-2xl px-4 py-2 hover:bg-violet-400 transition cursor-pointer"
      onClick={() => signOut({ callbackUrl: "/login" })}
    >
      Sign Out
    </button>
  );
}
