export default async function Page() {
  const response = await fetch("https://jsonplaceholder.typicode.com/albums");
  if (!response.ok) {
    throw new Error("Failed to fetch");
  }

  const albums = await response.json();
  // throw new Error("not implemented");
  return (
    <div>
      <h1>About page</h1>
      {albums.map((el: { id: number; title: string }) => (
        <div key={el.id}>
          {el.id}. {el.title}
        </div>
      ))}
    </div>
  );
}
