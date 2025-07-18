import LoginButton from "./components/navigation/loginButton";
import RegisterButton from "./components/navigation/registerButton";
import GoogleSignInButton from "./components/authentication/googleSignInButton";

export default function HomePage() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-8">Home Page</h1>
      <div className="mt-6 flex gap-4">
        <LoginButton />
        <RegisterButton />
        <GoogleSignInButton />
      </div>
    </>
  );
}
