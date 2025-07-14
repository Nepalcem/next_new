"use client";
import React from "react";
import { logout } from "../lib/actions/auth";

export default function SignOutButton() {
  return (
    <button className="bg-fuchsia-300" onClick={() => logout()}>
      Sign Out
    </button>
  );
}
