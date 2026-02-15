import React from "react";
import Logo from "./Logo";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-purple-900 to-blue-900 text-white pt-12 pb-6 px-4 mt-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between md:items-start gap-10">
        <div className="flex flex-col items-start mb-8 md:mb-0">
          <Logo />
          <p className="mt-4 text-sm text-purple-100 max-w-xs">
            Care.xyz — Trusted, compassionate, and professional care for your
            loved ones. Connecting families with verified caretakers for peace
            of mind.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 flex-1">
          <div>
            <h6 className="text-lg font-semibold mb-3 text-purple-200">
              Services
            </h6>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-purple-300 transition">
                  Branding
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-300 transition">
                  Design
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-300 transition">
                  Marketing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-300 transition">
                  Advertisement
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h6 className="text-lg font-semibold mb-3 text-purple-200">
              Company
            </h6>
            <ul className="space-y-2">
              <li>
                <a href="/about" className="hover:text-purple-300 transition">
                  About us
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-purple-300 transition">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-300 transition">
                  Jobs
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-300 transition">
                  Press kit
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h6 className="text-lg font-semibold mb-3 text-purple-200">
              Legal
            </h6>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-purple-300 transition">
                  Terms of use
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-300 transition">
                  Privacy policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-300 transition">
                  Cookie policy
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-purple-800 mt-10 pt-6 text-center text-sm text-purple-200">
        &copy; {new Date().getFullYear()} Care.xyz. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
