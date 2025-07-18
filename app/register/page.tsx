import { auth } from "@/auth";
import { redirect } from "next/navigation";
import RegisterForm from "./form";

export default async function RegisterPage() {
  const session = await auth();

  if (session) {
    redirect("/");
  }

  return (
    <section className="flex items-center justify-center">
      <div className="w-[600px]">
        <RegisterForm />
      </div>
    </section>
  );
}
