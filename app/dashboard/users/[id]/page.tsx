import React from "react";

export default function Page({ params }: { params: { id: string } }) {
  //destructuring id from params
  const { id } = params;

  return <div>User {id} Page</div>;
}
