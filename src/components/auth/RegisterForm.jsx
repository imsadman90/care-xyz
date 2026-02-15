"use client";
import Link from "next/link";
import { SocialButtons } from "./SocialButton";
import { useState } from "react";
import { postUser } from "@/actions/server/auth";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import Swal from "sweetalert2";
import { AiOutlineLoading } from "react-icons/ai";

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-white relative px-2 py-20">
      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-white/70 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-4">
            <AiOutlineLoading
              size={48}
              className="animate-spin text-purple-600"
            />
            <h2 className="text-xl font-semibold text-purple-700 animate-pulse">
              Processing Registration...
            </h2>
          </div>
        </div>
      )}
      <div className="w-full max-w-2xl rounded-2xl shadow-2xl bg-white border border-purple-100 p-8 relative z-10">
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-extrabold text-purple-700 mb-2 tracking-tight">
            Create your account
          </h2>
          <p className="text-gray-500 text-sm">
            Join us and start your journey!
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
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
              placeholder="Your Name"
              className="input input-bordered w-full focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
              onChange={handleChange}
              required
              autoComplete="name"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="you@gmail.com"
              className="input input-bordered w-full focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
              onChange={handleChange}
              required
              autoComplete="email"
            />
          </div>
          <div>
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
              placeholder="min 6 characters"
              className="input input-bordered w-full focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
              onChange={handleChange}
              required
              autoComplete="new-password"
            />
          </div>
          <button
            disabled={loading}
            type="submit"
            className="btn btn-primary w-full bg-gradient-to-r from-purple-500 to-purple-700 border-0 text-white font-semibold shadow-md hover:from-purple-600 hover:to-purple-800 transition-all"
          >
            Register
          </button>
        </form>
        <div className="my-6 flex items-center gap-2">
          <div className="flex-grow border-t border-gray-200" />
          <span className="text-gray-400 text-xs font-medium">
            or continue with
          </span>
          <div className="flex-grow border-t border-gray-200" />
        </div>
        <SocialButtons />
        <p className="text-center text-sm mt-6 text-gray-600">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-purple-600 hover:underline font-medium"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};
