"use client";
import React, { useState } from "react";
import Logo from "./Logo";
import Link from "next/link";
import NavLink from "../buttons/NavLink";
import { FiShoppingCart } from "react-icons/fi";
import AuthButtons from "../buttons/AuthButtons";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const nav = (
    <>
      <li>
        <NavLink href={"/"}>Home</NavLink>
      </li>
      <li>
        <NavLink href={"/services"}>Services</NavLink>
      </li>
      <li>
        <NavLink href={"/my-booking"}>My Booking</NavLink>
      </li>
      <li>
        <NavLink href={"/about"}>About</NavLink>
      </li>
      <li>
        <NavLink href={"/contact"}>Contact</NavLink>
      </li>
    </>
  );
  return (
    <header className="sticky top-0 z-50 w-full shadow-md bg-white/90  border-b border-base-200">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left: Logo & Mobile menu */}
          <div className="flex items-center gap-4">
            {/* Mobile menu button */}
            <button
              type="button"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              className="lg:hidden btn btn-ghost p-2 rounded-md hover:bg-base-200 focus:bg-base-200 transition"
              onClick={() => setMobileMenuOpen((open) => !open)}
            >
              {mobileMenuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
            <Logo />
          </div>
          {/* Center: Nav links */}
          <div className="hidden lg:flex">
            <ul className="menu menu-horizontal gap-2 px-1 text-base font-medium">
              {nav}
            </ul>
          </div>
          {/* Right: Cart & Auth */}
          <div className="flex items-center gap-2 sm:gap-4">
            <Link href={"/cart"} className="relative group">
              <span className="btn btn-circle border-2 border-purple-200 bg-purple-50 hover:bg-purple-100 transition-all shadow-none">
                <FiShoppingCart className="text-xl text-purple-600 group-hover:text-purple-800 transition" />
              </span>
            </Link>
            <AuthButtons />
          </div>
        </div>
        {/* Mobile menu drawer */}
        <div
          id="mobile-menu"
          className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"} lg:hidden`}
          aria-hidden={!mobileMenuOpen}
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className={`absolute top-0 left-0 w-64 h-full bg-white shadow-lg p-6 transition-transform duration-300 ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-6 flex items-center justify-between">
              <Logo />
              <button
                type="button"
                aria-label="Close menu"
                className="btn btn-ghost p-2 rounded-md hover:bg-base-200 focus:bg-base-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <ul className="menu menu-vertical gap-2 text-base font-medium">
              {nav}
            </ul>
            <div className="mt-6 flex items-center gap-4">
              <Link href={"/cart"} className="relative group">
                <span className="btn btn-circle border-2 border-purple-200 bg-purple-50 hover:bg-purple-100 transition-all shadow-none">
                  <FiShoppingCart className="text-xl text-purple-600 group-hover:text-purple-800 transition" />
                </span>
              </Link>
              <AuthButtons />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
