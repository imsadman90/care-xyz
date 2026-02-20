import React from "react";

export default function AdminLayout({ children }) {
  return (
    <div className="bg-gray-50">
      <main className="">
        <div className="max-w-6xl">{children}</div>
      </main>
    </div>
  );
}
