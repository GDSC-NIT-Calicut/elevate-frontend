"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const [loadingToken, setLoadingToken] = useState(false);
  const [backendResponse, setBackendResponse] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const verifyAndFetchTokens = async () => {
      try {
        setLoadingToken(true);
        const response = await axios.post(
          "/api/auth/verify-and-get-tokens"
        );
        setBackendResponse(response.data);
        console.log("Tokens & User Info:", response.data);
      } catch (err: any) {
        console.error("Error verifying token:", err.response?.data || err.message);
        setError("Failed to verify session with backend.");
      } finally {
        setLoadingToken(false);
      }
    };

    if (status === "authenticated") {
      verifyAndFetchTokens();
    }
  }, [status]);

  if (status === "loading") {
    return <div className="p-4">Loading session...</div>;
  }

  return (
    <div className="p-6">
      {status === "authenticated" ? (
        <>
          <p className="mb-4 text-lg">
            Signed in as <strong>{session.user?.email}</strong>
          </p>

          {loadingToken ? (
            <p>Verifying with backend...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : backendResponse ? (
            <div className="text-green-600">
              <p>Welcome, {backendResponse.user?.name}</p>
              <p>Tokens received successfully.</p>
            </div>
          ) : null}

          <button
            onClick={() => signOut()}
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded mt-4"
          >
            Sign Out
          </button>
        </>
      ) : (
        <button
          onClick={() => signIn("google")}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          Sign in with Google
        </button>
      )}
    </div>
  );
}
