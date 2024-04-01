"use client";

export default function ErrorBoundary({ error }: { error: Error }) {
  console.log(error.cause);

  return (
    <>
      <div>{error.message}</div>
      <div>{error.stack}</div>
      <div>{error.name}</div>
    </>
  );
}
