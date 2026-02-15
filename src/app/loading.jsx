"use client"
import React, { useEffect, useState } from "react";

const Loading = () => {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 3000);
    return () => clearTimeout(timer);
  }, []);
  if (!show) return null;
  return (
    <div className="flex flex-col min-h-screen justify-center items-center gap-8 bg-gradient-to-br from-purple-50 to-white">
      <div className="flex flex-col items-center gap-4">
        <span className="relative flex h-70 w-70">
          <span className="absolute inline-flex h-full w-full rounded-full bg-purple-200 opacity-75 animate-ping"></span>
        </span>
        <h2 className="text-5xl font-extrabold text-purple-700 animate-pulse tracking-wide">
          Loading...
        </h2>
        <p className="text-gray-400 text-sm">
          Please wait while we prepare your experience
        </p>
      </div>
    </div>
  );
};

export default Loading;
