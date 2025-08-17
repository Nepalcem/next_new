"use client";
import { signIn } from "next-auth/react";

export default function GoogleSignInButton() {
  return (
    <button
      className="bg-violet-400 rounded-2xl px-4 py-2 text-white hover:bg-violet-500 transition cursor-pointer"
      onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
    >
      Sign in with Google
    </button>
  );
}
