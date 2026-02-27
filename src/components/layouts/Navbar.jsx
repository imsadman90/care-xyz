"use client";
import React, { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import Logo from "./Logo";
import NavLink from "../buttons/NavLink";
import AuthButtons from "../buttons/AuthButtons";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: session } = useSession();
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const scrollUpDistance = useRef(0);

  const closeMenu = () => setMobileMenuOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const diff = currentScrollY - lastScrollY.current;

      if (currentScrollY < 10) {
        setIsVisible(true);
        scrollUpDistance.current = 0;
      } else if (diff < 0) {
        scrollUpDistance.current += Math.abs(diff);
        if (scrollUpDistance.current > 50) {
          setIsVisible(true);
        }
      } else if (diff > 5) {
        setIsVisible(false);
        setMobileMenuOpen(false);
        scrollUpDistance.current = 0;
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const NavLinks = ({ onClose }) => (
    <>
      <li>
        <NavLink href={"/"} onClick={onClose}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink href={"/about"} onClick={onClose}>
          About
        </NavLink>
      </li>
      <li>
        <NavLink href={"/services"} onClick={onClose}>
          Services
        </NavLink>
      </li>
      {session?.user && (
        <li>
          <NavLink href={"/my-booking"} onClick={onClose}>
            My Bookings
          </NavLink>
        </li>
      )}
      <li>
        <NavLink href={"/contact"} onClick={onClose}>
          Contact
        </NavLink>
      </li>
      <li>
        <NavLink href={"/admin-dashboard"} onClick={onClose}>
          Admin Dashboard
        </NavLink>
      </li>
    </>
  );

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm transition-transform duration-300 ease-in-out ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex h-20 items-center justify-between">
            <div className="flex items-center gap-2">
              <Logo />
            </div>

            <div className="hidden lg:flex flex-1 justify-center">
              <ul className="flex gap-8 text-base font-medium text-gray-700">
                <NavLinks />
              </ul>
            </div>

            <div className="flex lg:hidden">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                aria-controls="mobile-menu"
                aria-expanded={mobileMenuOpen}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
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

            <div className="hidden lg:flex items-center gap-2">
              <AuthButtons />
            </div>
          </div>
        </nav>
      </header>

      <div
        className={`lg:hidden fixed inset-0 z-40 transition-all duration-300 ease-in-out ${
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        id="mobile-menu"
        style={{
          background: mobileMenuOpen ? "rgba(0,0,0,0.3)" : "transparent",
        }}
        aria-hidden={!mobileMenuOpen}
        onClick={closeMenu}
      >

        <div
          className={`absolute top-20 left-0 right-0 transition-all duration-300 ease-in-out ${
            mobileMenuOpen
              ? "translate-y-0 opacity-100"
              : "-translate-y-4 opacity-0"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <ul className="flex flex-col gap-4 py-4 text-base font-medium text-gray-700 bg-white border-t border-gray-200 shadow-md max-w-md mx-auto  px-4">
            <NavLinks onClose={closeMenu} />
            <li className="flex justify-center mt-2">
              <AuthButtons />
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
