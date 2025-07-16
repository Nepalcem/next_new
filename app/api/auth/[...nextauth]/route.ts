// import { handlers } from "@/auth"; // Referring to the auth.ts we just created
// export const { GET, POST } = handlers;
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import sql from "@/app/lib/db/db";
import bcrypt from "bcrypt";
import type { User } from "next-auth";
import type { UserType } from "@/app/types/user";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials): Promise<User | null> => {
        const { email, password } = credentials!;

        // Get user from DB
        const result = await sql`SELECT * FROM users WHERE email = ${email}`;
        const [user] = result as UserType[];

        if (!user || !user.password) throw new Error("User not found");

        if (typeof password !== "string") {
          throw new Error("Invalid password");
        }

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) throw new Error("Invalid password");

        return {
          id: user.id.toString(),
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.role = token.role as string;
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/", // optional: custom login UI
  },
  debug: true,
});

export { handler as GET, handler as POST };