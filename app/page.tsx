"use server";
import SignInButton from "./components/signInButton";
import { auth } from "@/auth";
import Image from "next/image";
import SignOutButton from "./components/signOutButton";

export default async function Home() {
  const session = await auth();

  if (session?.user) {
    return (
      <>
        <div>
          <h1>User signed in with name: {session.user.name}</h1>
          <p>Email: {session.user.email}</p>
          {session.user.image && (
            <Image
              className="rounded-xl"
              src={session.user.image}
              width={48}
              height={48}
              alt={session.user.name ?? "Avatar"}
            />
          )}
        </div>
        <SignOutButton/>
      </>
    );
  }

  return (
    <>
      <h1 className="text-2xl">Home</h1>
      <div>
        <p>You are not Signed in</p>
        <SignInButton />
      </div>
    </>
  );
}
