"use client";
import { signIn } from "next-auth/react";
import { useParams, useSearchParams } from "next/navigation";
import { FaGoogle } from "react-icons/fa";

export const SocialButtons = () => {
  const params = useSearchParams();

  const handleSignIn = async () => {
    const result = await signIn("google", {
      // redirect: "false",
      callbackUrl: params.get("callbackUrl") || "/",
    });
  };

  return (
    <div className="flex gap-3 mt-4">
      <button
        onClick={handleSignIn}
        className="btn btn-outline bg-green-50 hover:bg-green-100 border-green-400 border-2  text-green-600 flex-1"
      >
        <FaGoogle className="text-lg" />
        Google
      </button>
    </div>
  );
};
