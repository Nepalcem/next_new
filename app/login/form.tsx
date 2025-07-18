"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    if (res?.ok) {
      router.push("/dashboard");
    } else {
      setMessage(res?.error || "Invalid email or password.");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: "0 auto" }}>
      <h2>Login</h2>
      <div style={{ marginBottom: 12 }}>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: "100%", border: "1px solid #ccc" }}
        />
      </div>
      <div style={{ marginBottom: 12 }}>
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: "100%", border: "1px solid #ccc" }}
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        style={{ width: "100%", border: "1px solid #ccc" }}
      >
        {loading ? "Logging in..." : "Login"}
      </button>
      {message && <p style={{ marginTop: 16 }}>{message}</p>}
    </form>
  );
}
