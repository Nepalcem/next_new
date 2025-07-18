import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import sql from "@/app/lib/db/db";
import bcrypt from "bcrypt";

export const authOptions = {
  providers: [
    Google,
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        const users =
          await sql`SELECT * FROM users WHERE email = ${credentials.email}`;
        if (users.length === 0) return null;
        const user = users[0];
        const isValid = await bcrypt.compare(
          String(credentials.password),
          String(user.password)
        );
        if (!isValid) return null;
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: "user",
        };
      },
    }),
  ],
  session: {
    strategy: "jwt" as const,
  },
  pages: {
    signIn: "/login",
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
export const { GET, POST } = handlers;
