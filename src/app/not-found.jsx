import Link from "next/link";
import React from "react";
import { FaSearch, FaUserNurse, FaChild, FaNotesMedical } from "react-icons/fa";

const Error404 = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#f7fafd] px-2 py-8">
      {/* Card with icon */}
      <div
        className="bg-white rounded-3xl shadow-lg p-8 flex flex-col items-center mb-6"
        style={{ maxWidth: 420 }}
      >
        <div className="w-28 h-28 rounded-2xl bg-blue-50 flex items-center justify-center mb-4">
          <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100">
            <FaSearch className="text-blue-500 text-4xl" />
          </span>
        </div>
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2 text-center">
          Oops! Page Not Found
        </h1>
        <p className="text-gray-500 text-center mb-6 max-w-xs">
          It seems we can't find the page you're looking for. Don't worry, we're
          still here to help you find the best care for your loved ones.
        </p>
        <div className="flex gap-4 w-full justify-center mb-4">
          <Link
            href="/"
            className="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold text-base shadow hover:bg-blue-700 transition text-center"
          >
            Back to Home
          </Link>
          <Link
            href="/contact"
            className="px-6 py-3 rounded-xl bg-white border border-blue-600 text-blue-600 font-semibold text-base shadow hover:bg-blue-50 transition text-center"
          >
            Contact Support
          </Link>
        </div>
      </div>
      {/* Suggestions */}
      <div className="flex gap-12 mt-6">
        <div className="flex flex-col items-center gap-2">
          <span className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
            <FaUserNurse className="text-blue-500 text-2xl" />
          </span>
          <span className="text-sm font-semibold text-gray-700">
            Senior Care
          </span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <span className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
            <FaChild className="text-blue-500 text-2xl" />
          </span>
          <span className="text-sm font-semibold text-gray-700">
            Child Care
          </span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <span className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
            <FaNotesMedical className="text-blue-500 text-2xl" />
          </span>
          <span className="text-sm font-semibold text-gray-700">
            Special Needs
          </span>
        </div>
      </div>
    </div>
  );
};

export default Error404;
