import Link from "next/link";

export default function LoginButton() {
  return (
    <Link href="/login">
      <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition cursor-pointer">
        Login
      </button>
    </Link>
  );
}
