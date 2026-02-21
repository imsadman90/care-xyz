"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import Logo from "./Logo";
import NavLink from "../buttons/NavLink";
import AuthButtons from "../buttons/AuthButtons";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: session } = useSession();
  const nav = (
    <>
      <li>
        <NavLink href={"/"}>Home</NavLink>
      </li>
      <li>
        <NavLink href={"/about"}>About</NavLink>
      </li>
      <li>
        <NavLink href={"/services"}>Services</NavLink>
      </li>
      {session?.user && (
        <li>
          <NavLink href={"/my-booking"}>My Bookings</NavLink>
        </li>
      )}
      {/* Admin Dashboard link, only visible to admin */}
      <li>
        <NavLink href={"/admin-dashboard"}>Admin Dashboard</NavLink>
      </li>
    </>
  );
  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Left: Logo and site name */}
          <div className="flex items-center gap-2">
            <Logo />
          </div>
          {/* Center: Nav links */}
          <div className="hidden lg:flex flex-1 justify-center">
            <ul className="flex gap-8 text-base font-medium text-gray-700">
              {nav}
            </ul>
          </div>
          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              aria-controls="mobile-menu"
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {/* Hamburger icon */}
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
          {/* Right: Auth Buttons */}
          <div className="hidden lg:flex items-center gap-2">
            <AuthButtons />
          </div>
        </div>
        {/* Mobile menu */}
        {/* Mobile menu with smooth transition */}
        <div
          className={`lg:hidden fixed inset-0 z-40 transition-all duration-300 ease-in-out ${mobileMenuOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-4 pointer-events-none"}`}
          id="mobile-menu"
          style={{
            background: mobileMenuOpen
              ? "rgba(255,255,255,0.98)"
              : "rgba(255,255,255,0)",
          }}
          aria-hidden={!mobileMenuOpen}
        >
          <ul className="flex flex-col gap-4 py-4 text-base font-medium text-gray-700 bg-white border-t border-gray-200 shadow-md max-w-md mx-auto mt-4 rounded-xl px-4">
            {nav}
            <li className="flex justify-center mt-2">
              <AuthButtons />
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
