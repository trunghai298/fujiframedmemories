"use client";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const SignIn = () => {
  const { data: session } = useSession();
  const router = useRouter();

  if (session && session.user) {
    return (
      <div className="flex gap-4 ml-auto">
        <p className="text-sky-600">Signed in as {session.user.email}</p>
        <button className="text-red-600" onClick={() => signOut()}>
          Sign out
        </button>
      </div>
    );
  }
  return (
    <button
      onClick={() => router.push("/api/auth/google")}
      className="text-green-600 ml-auto"
    >
      SignIn
    </button>
  );
};

export default SignIn;
