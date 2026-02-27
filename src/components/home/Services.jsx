"use client";
import Loading from "@/app/services/[id]/loading";
import ServiceCard from "../cards/ServiceCard";
import Pagination from "./Pagination";
import { getServices } from "@/actions/server/service";
import React, { useState, useRef } from "react";

export default function ServicesWrapper() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const pageSize = 6;

  React.useEffect(() => {
    getServices().then((data) => {
      setServices(data);
      setLoading(false);
    });
  }, []);

  const [fade, setFade] = useState(false);

  // Filter services based on search query
  const filteredServices = services.filter((service) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;
    return (
      service.title?.toLowerCase().includes(query) ||
      service.description?.toLowerCase().includes(query)
    );
  });

  const paginated = filteredServices.slice(
    (page - 1) * pageSize,
    page * pageSize,
  );

  const handleSetPage = (p) => {
    if (p === page) return;
    setFade(true);
    setTimeout(() => {
      setPage(p);
      setFade(false);
    }, 250);
  };

  // Reset to page 1 whenever search query changes
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setPage(1);
  };

  return (
    <div>
      <h2 className="text-center text-6xl font-bold mb-10">
        Our <span className="text-sky-600">Services</span>
      </h2>

      {/* Search Bar */}
      <div className="flex justify-center mb-8">
        <div className="relative w-full max-w-md">
          <span className="absolute inset-y-0 left-4 flex items-center text-gray-400 pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
              />
            </svg>
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search services..."
            className="w-full pl-11 pr-10 py-3 rounded-full border border-gray-200 shadow-sm bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-400 transition"
          />
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery("");
                setPage(1);
              }}
              className="absolute inset-y-0 right-4 flex items-center text-gray-400 hover:text-gray-600 transition"
              aria-label="Clear search"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
      </div>

      {loading ? (
        <div className="text-center py-20 text-lg text-gray-400">
          <Loading />
        </div>
      ) : (
        <>
          {/* No results state */}
          {filteredServices.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-2xl text-gray-400 font-medium">
                No services found for{" "}
                <span className="text-sky-500">"{searchQuery}"</span>
              </p>
              <button
                onClick={() => setSearchQuery("")}
                className="mt-4 text-sm text-sky-600 hover:underline"
              >
                Clear search
              </button>
            </div>
          ) : (
            <>
              <div
                className={`grid md:grid-cols-3 gap-5 transition-opacity duration-300 ${
                  fade ? "opacity-0" : "opacity-100"
                }`}
              >
                {paginated.map((service) => (
                  <ServiceCard key={service._id} service={service} />
                ))}
              </div>
              <Pagination
                total={filteredServices.length}
                page={page}
                setPage={handleSetPage}
                pageSize={pageSize}
              />
            </>
          )}
        </>
      )}
    </div>
  );
}
