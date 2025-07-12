export default async function Page() {
    const response = await fetch("http://localhost:3000/api/books");
    const books = await response.json();

    return (
        <div>{JSON.stringify(books, null, 2)}</div>
    );
}