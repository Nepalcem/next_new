import BackToHomeButton from "@/app/components/navigation/backToHomeButton";
import LoginButton from "@/app/components/navigation/loginButton";

export default function AuthErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
      <p className="mb-2">You do not have permission to sign in.</p>
      <p>If you believe this is a mistake, please contact support.</p>
      <BackToHomeButton />
      <LoginButton />
    </div>
  );
}
