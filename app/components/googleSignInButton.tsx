"use client";
import React from 'react'
import { googleLogin } from '../lib/actions/auth';


export default function GoogleSignInButton() {
  return (
    <button className="bg-violet-400 rounded-2xl" onClick={() => googleLogin()}>
      Sign in with Google
    </button>
  );
}
