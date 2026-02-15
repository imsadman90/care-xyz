"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavLink = ({ href, children }) => {
  const path = usePathname();
  const isActive =
    href === "/"
      ? path === href
      : typeof path === "string" && path.startsWith(href);
  return (
    <Link
      href={href}
      className={`px-3 py-2 rounded-md transition font-medium focus:outline-none focus:ring-2 focus:ring-purple-300 hover:bg-purple-50 hover:text-purple-700 ${
        isActive ? "text-purple-700 bg-purple-100" : "text-gray-700"
      }`}
    >
      {children}
    </Link>
  );
};

export default NavLink;
