"use client";
import Link from "next/link";
import { SocialButtons } from "./SocialButton";
import { signIn } from "next-auth/react";
import Swal from "sweetalert2";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";

const LoginForm = () => {
  const params = useSearchParams();
  const router = useRouter();
  const callback = params.get("callbackUrl") || "/";
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password, callback);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl: params.get("callbackUrl") || "/",
    });

    if (!result.ok) {
      Swal.fire(
        "error",
        "Email password not Matched . Try Google Login / Register",
        "error",
      );
    } else {
      Swal.fire("success", "Welcome to Kidz Hub", "success");
      router.push(callback);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-white relative px-2">
      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-white/70 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-4">
            <AiOutlineLoading
              size={48}
              className="animate-spin text-purple-600"
            />
            <h2 className="text-xl font-semibold text-purple-700 animate-pulse">
              Processing Login...
            </h2>
          </div>
        </div>
      )}
      <div className="w-full max-w-md rounded-2xl shadow-2xl bg-white border border-purple-100 p-8 relative z-10">
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-extrabold text-purple-700 mb-2 tracking-tight">
            Sign in to your account
          </h2>
          <p className="text-gray-500 text-sm">
            Welcome back! Please enter your details.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
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
              placeholder="you@example.com"
              className="input input-bordered w-full focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
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
              placeholder="••••••••"
              className="input input-bordered w-full focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
              required
              autoComplete="current-password"
            />
          </div>
          <button
            disabled={loading}
            type="submit"
            className="btn btn-primary w-full bg-gradient-to-r from-purple-500 to-purple-700 border-0 text-white font-semibold shadow-md hover:from-purple-600 hover:to-purple-800 transition-all"
          >
            Login
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
          Don’t have an account?{" "}
          <Link
            href={`/register?callbackUrl=${callback}`}
            className="text-purple-600 hover:underline font-medium"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};
export default LoginForm;
