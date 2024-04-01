"use client";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  console.log(error.cause);

  return (
    <>
      <div>{error.message}</div>
      <div>{error.stack}</div>
      <div>{error.name}</div>
      <button onClick={reset}>Try again</button>
    </>
  );
}
