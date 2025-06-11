"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import axios from "axios";

export default function LoginPage() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      axios.post(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/auth/verify-and-get-tokens`)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
    else if (status === "unauthenticated") {
      console.log("unauthenticated");
    }
  }, [status]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {status === "authenticated" ? (
        <>
          <p>Signed in as {session.user?.email}</p>
          <button
            className="bg-red-400 cursor-pointer p-5 m-3 rounded-xl"
            onClick={() => signOut()}
          >
            Sign Out
          </button>
        </>
      ) : (
        <button
          className="bg-blue-400 cursor-pointer p-5 m-3 rounded-xl"
          onClick={() => signIn("google")}
        >
          Sign in with Google
        </button>
      )}
    </div>
  );
}
