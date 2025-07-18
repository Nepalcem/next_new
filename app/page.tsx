import Link from "next/link";
import GoogleSignInButton from "./components/googleSignInButton";

export default function HomePage() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-8">Home Page</h1>
      <div className="mt-6 flex gap-4">
        <Link href="/login">
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
            Login
          </button>
        </Link>
        <Link href="/register">
          <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
            Register
          </button>
        </Link>
        <GoogleSignInButton />
      </div>
    </>
  );
}
