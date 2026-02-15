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
          className="btn btn-sm px-4 py-2 rounded-md border-2 border-purple-500 bg-purple-100 text-purple-700 hover:bg-purple-200 transition font-semibold shadow-none"
        >
          Log Out
        </button>
      ) : (
        <Link href={"/login"}>
          <button className="btn btn-sm px-4 py-2 rounded-md border-2 border-purple-500 bg-purple-100 text-purple-700 hover:bg-purple-200 transition font-semibold shadow-none">
            Login
          </button>
        </Link>
      )}
    </div>
  );
};

export default AuthButtons;
