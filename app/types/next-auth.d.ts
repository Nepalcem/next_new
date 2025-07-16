//rewriting default next-auth user with new required field

import type { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    role: string;
  }

  interface Session extends DefaultSession {
    user: DefaultSession["user"] & {
      role: string;
    };
  }
}
