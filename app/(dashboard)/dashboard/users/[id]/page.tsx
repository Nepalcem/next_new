import React from "react";

export default async function Page({ params }: { params: { id: string } }) {
  //destructuring id from params and awaiting it , because Page params come asynchronously
  const { id } = await params;

  return <div>User {id} Page</div>;
}
