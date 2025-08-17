import LoginButton from "./components/navigation/loginButton";
import RegisterButton from "./components/navigation/registerButton";
import GoogleSignInButton from "./components/authentication/googleSignInButton";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-8">TM-GA CRM</h1>
      <div className="mt-6 flex gap-4">
        <LoginButton />
        <RegisterButton />
        <GoogleSignInButton />
      </div>
    </div>
  );
}
