import { auth } from "@/auth";
import { redirect } from "next/navigation";
import SignOutButton from "../components/authentication/signOutButton";

export default async function Dashboard() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <div>
      <h1>Welcome, {session?.user?.email}!</h1>
      <SignOutButton />
    </div>
  );
}
