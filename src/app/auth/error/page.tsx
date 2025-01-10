// app/auth/error/page.tsx
import Link from "next/link";

// Make the page component async to properly handle searchParams
export default async function ErrorPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  const errorMessage = searchParams.error === "Configuration"
    ? "There was a problem with the server configuration."
    : searchParams.error || "An error occurred during authentication.";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Authentication Error</h1>
          <p className="text-gray-500">
            {errorMessage}
          </p>
        </div>
        <div className="flex justify-center">
          <Link 
            href="/auth/login"
            className="text-[#a47764] hover:underline"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}