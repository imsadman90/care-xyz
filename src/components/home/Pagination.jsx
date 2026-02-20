"use client";
import { useState } from "react";

export default function Pagination({ total, page, setPage, pageSize = 9 }) {
  const totalPages = Math.ceil(total / pageSize);
  if (totalPages <= 1) return null;

  const getPages = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (page > 3) pages.push(1);
      if (page > 4) pages.push("...");
      for (
        let i = Math.max(2, page - 1);
        i <= Math.min(totalPages - 1, page + 1);
        i++
      )
        pages.push(i);
      if (page < totalPages - 3) pages.push("...");
      if (page < totalPages - 2) pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="flex justify-center items-center gap-2 mt-8 select-none">
      <button
        className="px-3 py-1 rounded border text-gray-600 disabled:opacity-50"
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
      >
        Prev
      </button>
      {getPages().map((p, idx) =>
        p === "..." ? (
          <span key={idx} className="px-2 text-gray-400">
            ...
          </span>
        ) : (
          <button
            key={p}
            className={`px-3 py-1 rounded border ${p === page ? "bg-blue-600 text-white border-blue-600" : "text-gray-700"}`}
            onClick={() => setPage(p)}
            disabled={p === page}
          >
            {p}
          </button>
        ),
      )}
      <button
        className="px-3 py-1 rounded border text-gray-600 disabled:opacity-50"
        onClick={() => setPage(page + 1)}
        disabled={page === totalPages}
      >
        Next
      </button>
    </div>
  );
}
