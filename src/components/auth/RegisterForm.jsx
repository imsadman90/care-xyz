"use client";
import Link from "next/link";
import { SocialButtons } from "./SocialButton";
import { useState } from "react";
import { postUser } from "@/actions/server/auth";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import Swal from "sweetalert2";
import { AiOutlineLoading } from "react-icons/ai";
import Logo from "../layouts/Logo";

export const RegisterForm = () => {
  const params = useSearchParams();
  const router = useRouter();
  const callbackUrl = params.get("callbackUrl") || "/";
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!form.email.endsWith("gmail.com")) {
      Swal.fire("We only Accept Gmail", "Gmail একাউণ্ট ব্যবহার করুন", "error");
      setLoading(false);
      return;
    }

    if (form.password.length < 6) {
      Swal.fire("Week Password", "Stong পাসওয়ার্ড দিন", "error");
      setLoading(false);
      return;
    }
    const result = await postUser(form);

    if (result.acknowledged) {
      const result = await signIn("credentials", {
        email: form.email,
        password: form.password,
        redirect: false,
        callbackUrl: callbackUrl,
      });
      if (result.ok) {
        Swal.fire("success", "Registered successfully", "success");
        router.push(callbackUrl);
      }
      setLoading(false);
    } else {
      Swal.fire("error", "এই gmail এ  একটি একাউন্ট আছে । লগিন করুন ", "error");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-5">
      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-white/70 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-4">
            <AiOutlineLoading
              size={48}
              className="animate-spin text-blue-600"
            />
            <h2 className="text-xl font-semibold text-blue-700 animate-pulse">
              Processing Registration...
            </h2>
          </div>
        </div>
      )}
      <div className="w-full max-w-5xl shadow-2xl flex flex-col md:flex-row overflow-hidden my-10">
        {/* Left: Info */}
        <div className="hidden md:flex flex-col justify-between bg-blue-500 flex-1 p-10 text-white relative">
          <div>
            <h2 className="text-3xl font-extrabold mb-4 leading-tight">
              Join our community of trusted caregivers.
            </h2>
            <p className="text-base mb-8">
              Every step you take brings quality care closer to those who need
              it most. Start your professional journey today.
            </p>
          </div>
          <div className="flex items-center gap-2 mt-8">
            <img
              src="https://img.freepik.com/premium-vector/caregiver-logo-design-template-premium-download_529200-531.jpg?w=360"
              alt="Caregivers"
              className="w-12 h-12 rounded-full border-2 border-white"
            />
            <span className="text-xs">
              Trusted by 10,000+ certified caregivers
            </span>
          </div>
        </div>
        {/* Right: Register Form */}
        <div className="flex-1 flex flex-col justify-center p-8">
          <div className="mb-6">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-1">
              Create an account
            </h2>
            <p className="text-gray-500 text-sm mb-4">
              Please enter your professional details to get started.
            </p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4"
          >
            <div className="col-span-1">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Full Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="John Doe"
                className="input input-bordered w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                onChange={handleChange}
                required
                autoComplete="name"
              />
            </div>
            <div className="col-span-1">
              <label
                htmlFor="nid"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                NID Number{" "}
                <span title="National ID" className="text-gray-400 cursor-help">
                  ⓘ
                </span>
              </label>
              <input
                type="text"
                name="nid"
                id="nid"
                placeholder="1234567890"
                className="input input-bordered w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                // onChange={handleChange}
                autoComplete="off"
              />
            </div>
            <div className="col-span-1">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="name@example.com"
                className="input input-bordered w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                onChange={handleChange}
                required
                autoComplete="email"
              />
            </div>
            <div className="col-span-1">
              <label
                htmlFor="contact"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Contact Number
              </label>
              <input
                type="tel"
                name="contact"
                id="contact"
                placeholder="+1 (555) 000-0000"
                className="input input-bordered w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                // onChange={handleChange}
                autoComplete="tel"
              />
            </div>
            <div className="col-span-1">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="input input-bordered w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                onChange={handleChange}
                required
                autoComplete="new-password"
              />
            </div>
            <div className="col-span-1">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="••••••••"
                className="input input-bordered w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                // onChange={handleChange}
                autoComplete="new-password"
              />
            </div>
            <div className="col-span-2">
              <div className="bg-gray-50 rounded-xl p-4 mt-2 mb-2">
                <div className="font-semibold mb-2 text-gray-700 text-sm">
                  PASSWORD REQUIREMENTS
                </div>
                <ul className="text-xs text-gray-500 space-y-1">
                  <li
                    className={
                      form.password.length >= 6 ? "text-green-600" : ""
                    }
                  >
                    ● At least 6 characters
                  </li>
                  <li
                    className={
                      /[A-Z]/.test(form.password) ? "text-green-600" : ""
                    }
                  >
                    ● 1 uppercase letter
                  </li>
                  <li
                    className={
                      /[a-z]/.test(form.password) ? "text-green-600" : ""
                    }
                  >
                    ● 1 lowercase letter
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-span-2">
              <button
                disabled={loading}
                type="submit"
                className="btn w-full bg-blue-50 border-blue-400 border-2 hover:bg-blue-100 text-blue-600 font-semibold text-lg py-2 rounded-lg shadow transition-all flex items-center justify-center gap-2"
              >
                Register <span className="text-xl">→</span>
              </button>
            </div>
          </form>
          <div className="my-3 flex items-center gap-2">
            <div className="flex-grow border-t border-gray-200" />
            <span className="text-gray-400 text-xs font-medium">OR</span>
            <div className="flex-grow border-t border-gray-200" />
          </div>
          <SocialButtons />
          <p className="text-center text-sm mt-6 text-gray-600">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-blue-600 hover:underline font-medium"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
