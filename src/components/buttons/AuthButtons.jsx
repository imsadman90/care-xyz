"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const AuthButtons = () => {
  const session = useSession();
  return (
    <div className="flex items-center gap-2">
      {session.status === "authenticated" ? (
        <button
          onClick={() => signOut()}
          className="btn btn-md px-4 py-2 rounded-full border-2 border-blue-500 bg-blue-100 text-black hover:bg-blue-200 transition font-semibold shadow-none"
        >
          Log Out
        </button>
      ) : (
        <Link href={"/login"}>
          <button className="btn btn-sm px-4 py-2 rounded-full border-2 border-blue-500 bg-blue-100 text-black hover:bg-blue-200 transition font-semibold shadow-none">
            Login
          </button>
        </Link>
      )}
    </div>
  );
};

export default AuthButtons;
