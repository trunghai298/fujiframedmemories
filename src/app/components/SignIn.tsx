"use client";
import React from "react";
import { useRouter } from "next/navigation";

const SignIn = () => {
  const router = useRouter();
  return (
    <div className="w-full bg-[#4285F4] rounded-md text-white">
      <button
        onClick={() => router.push("/api/auth/google")}
        className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-full bg-[#4285F4] text-white"
      >
        <div className="flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className=" w-5 h-5 mr-2"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <circle cx="12" cy="12" r="4"></circle>
            <line x1="21.17" x2="12" y1="8" y2="8"></line>
            <line x1="3.95" x2="8.54" y1="6.06" y2="14"></line>
            <line x1="10.88" x2="15.46" y1="21.94" y2="14"></line>
          </svg>
          Login with Google
        </div>
      </button>
    </div>
  );
};

export default SignIn;
