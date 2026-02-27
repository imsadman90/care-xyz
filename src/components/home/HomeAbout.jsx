// Simple About section for homepage
"use client";
import { FaRegHeart } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";

export default function HomeAbout() {
  return (
    <section className="max-w-5xl mx-auto px-4 py-16 flex flex-col md:flex-row items-center gap-10">
      <div className="flex-1">
        <span className="inline-block bg-blue-100 text-sky-700 px-3 py-1 rounded-full text-xs font-semibold mb-3">
          About Care.xyz
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
          Compassionate Care, Trusted Community
        </h2>
        <p className="text-gray-600 mb-5 max-w-lg">
          Care.xyz connects families with verified, compassionate caregivers. We
          make finding quality care simple, safe, and personal—so you can focus
          on what matters most.
        </p>
        <div className="flex gap-6 mt-4">
          <div className="flex items-center gap-2">
            <FaRegHeart className="text-xl text-blue-600" />
            <span className="text-sm font-medium text-gray-700">
              Personalized Support
            </span>
          </div>
          <div className="flex items-center gap-2">
            <FiUsers className="text-xl text-teal-600" />
            <span className="text-sm font-medium text-gray-700">
              Trusted Network
            </span>
          </div>
        </div>
      </div>
      <div className="flex-1 flex justify-center">
        <img
          src="https://thumbs.dreamstime.com/b/m-431550668.jpg"
          alt="Caregivers"
          className="w-full max-w-xs rounded-2xl shadow-lg"
        />
      </div>
    </section>
  );
}
