"use client";
import React, { useState } from "react";
import Logo from "./Logo";
import NavLink from "../buttons/NavLink";
import AuthButtons from "../buttons/AuthButtons";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
      <li>
        <NavLink href={"/my-booking"}>My Bookings</NavLink>
      </li>
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
          {/* Right: Auth Buttons */}
          <div className="flex items-center gap-2">
            <AuthButtons />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
