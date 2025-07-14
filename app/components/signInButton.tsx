"use client";
import React from 'react'
import { login } from '../lib/actions/auth';


export default function SignInButton() {
  return (
    <button className="bg-amber-600" onClick={() => login()}>
      Sign in with GH
    </button>
  );
}
