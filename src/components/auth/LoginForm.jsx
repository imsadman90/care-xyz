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
      Swal.fire("success", "Welcome to Care.xyz", "success");
      router.push(callback);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f7fa] px-2">
      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-white/70 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-4">
            <AiOutlineLoading
              size={48}
              className="animate-spin text-blue-600"
            />
            <h2 className="text-xl font-semibold text-blue-700 animate-pulse">
              Processing Login...
            </h2>
          </div>
        </div>
      )}
      <div className="w-full max-w-4xl bg-white shadow-2xl flex flex-col md:flex-row overflow-hidden border border-gray-100">
        {/* Left: Image & Text */}
        <div className="hidden md:flex flex-col justify-center bg-gray-50 flex-1 relative">
          <div className="relative w-full h-full ">
            <img
              src="https://cdn-hibhh.nitrocdn.com/cSmWTHYMVIExXzmhiWSuqcypazGVPyGD/assets/images/optimized/rev-264dfac/wcc.ca/wp-content/uploads/2024/10/wcc-blog-Is-caregiver-part-of-nursing.jpg"
              alt="Care with a personal touch"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/40 p-6 text-white shadow-lg">
              <h3 className="text-xl font-bold mb-2">
                Providing care with a personal touch.
              </h3>
              <p className="text-sm">
                Join thousands of families who trust Care.xyz for their loved
                ones' well-being.
              </p>
            </div>
          </div>
        </div>
        {/* Right: Login Form */}
        <div className="flex-1 flex flex-col justify-center p-8">
          <div className="mb-6">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-1">
              Welcome Back
            </h2>
            <p className="text-gray-500 text-sm ">
              Please enter your details to login.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
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
                placeholder="name@email.com"
                className="input input-bordered w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
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
                className="input input-bordered w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                required
                autoComplete="current-password"
              />
            </div>
            <button
              disabled={loading}
              type="submit"
              className="btn w-full bg-blue-50 hover:bg-blue-100 border-blue-400 border-2 text-blue-600 font-semibold text-lg rounded-lg shadow transition-all flex items-center justify-center gap-2"
            >
              Login <span className="text-xl">→</span>
            </button>
          </form>
          <div className="my-3 flex items-center gap-2">
            <div className="flex-grow border-t border-gray-200" />
            <span className="text-gray-400 text-xs font-medium">OR</span>
            <div className="flex-grow border-t border-gray-200" />
          </div>
          <SocialButtons />
          <p className="text-center text-sm mt-6 text-gray-600">
            Don’t have an account?{" "}
            <Link
              href={`/register?callbackUrl=${callback}`}
              className="text-blue-600 hover:underline font-medium"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
export default LoginForm;
