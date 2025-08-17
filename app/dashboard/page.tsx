import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getUserByEmail } from "@/app/lib/userService";
import PasswordForm from "./passwordForm";

export default async function Dashboard() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const user = await getUserByEmail(session.user?.email || "");

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="p-6 flex justify-between">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      {!user.password && <PasswordForm />}

      <div className="bg-white rounded-lg shadow p-6 mb-4 w-1/3 mx-auto">
        <h2 className="text-xl font-semibold mb-2">User Info</h2>
        <p>
          <strong>Name:</strong> {user.name || "Not set"}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Role:</strong> {user.role || "user"}
        </p>
        <p>
          <strong>Password Status:</strong> {user.password ? "Set" : "Not set"}
        </p>
      </div>

    </div>
  );
}
