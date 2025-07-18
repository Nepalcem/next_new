import LoginForm from "./form";
import Link from "next/link";

export default function LoginPage() {
  return (
    <section className="flex items-center justify-center">
      <div className="w-[400px]">
        <LoginForm />
        <div className="mt-6 text-center">
          <span className="mr-2">Don&apos;t have an account?</span>
          <Link href="/register">
            <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
              Register
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
