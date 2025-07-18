import { auth } from "@/auth";
import { redirect } from "next/navigation";
import RegisterForm from "./form";
import Link from "next/link";

export default async function RegisterPage() {
  const session = await auth();

  if (session) {
    redirect("/");
  }

  return (
    <section className="flex items-center justify-center">
      <div className="w-[600px]">
        <RegisterForm />
        <div className="mt-6 text-center">
          <span className="mr-2">Already have an account?</span>
          <Link href="/login">
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
              Login
            </button>
          </Link>
        </div>
        <Link href="/">
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
            Back to Home
          </button>
        </Link>
      </div>
    </section>
  );
}
