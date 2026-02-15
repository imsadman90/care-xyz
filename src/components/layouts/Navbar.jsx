import React from "react";
import Logo from "./Logo";
import Link from "next/link";
import NavLink from "../buttons/NavLink";
import { FiShoppingCart } from "react-icons/fi";
import AuthButtons from "../buttons/AuthButtons";

const Navbar = () => {
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
    <header className="sticky top-0 z-50 w-full shadow-md bg-white/90 backdrop-blur border-b border-base-200">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left: Logo & Mobile menu */}
          <div className="flex items-center gap-4">
            {/* Mobile menu button */}
            <div className="lg:hidden">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost p-2 rounded-md hover:bg-base-200 focus:bg-base-200 transition"
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
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex="-1"
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-48 p-2 shadow-lg"
              >
                {nav}
              </ul>
            </div>
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
              {/* Cart badge can be added here if needed */}
            </Link>
            <AuthButtons />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
