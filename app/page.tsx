import Hello from "./components/hello";

export default function Home() {
  console.log("Server Component type");

  return (
    <>
      <h1 className="text-3xl">First page</h1>
      <Hello />
    </>
  );
}
