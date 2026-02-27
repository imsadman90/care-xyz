"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { useSession } from "next-auth/react";

const NavLink = ({ href, children }) => {
  const path = usePathname();
  const { data: session } = useSession();
  const isActive =
    href === "/"
      ? path === href
      : typeof path === "string" && path.startsWith(href);
  if (
    (href === "/admin" || href === "/admin-dashboard") &&
    (!session || session.user.role !== "admin")
  ) {
    return null;
  }
  return (
    <Link
      href={href}
      className={`px-3 py-2 rounded-full transition font-medium focus:outline-none focus:ring-2 focus:ring-blue-300 hover:bg-blue-50 ${
        isActive ? "text-sky-600 bg-blue-100" : "text-gray-700"
      }`}
    >
      {children}
    </Link>
  );
};

export default NavLink;
