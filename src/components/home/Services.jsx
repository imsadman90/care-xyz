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
  const pageSize = 6;

  React.useEffect(() => {
    getServices().then((data) => {
      setServices(data);
      setLoading(false);
    });
  }, []);

  const [fade, setFade] = useState(false);
  const prevPage = useRef(page);
  const paginated = services.slice((page - 1) * pageSize, page * pageSize);

  // Handle fade-out/fade-in on page change
  const handleSetPage = (p) => {
    if (p === page) return;
    setFade(true);
    setTimeout(() => {
      setPage(p);
      setFade(false);
    }, 250);
  };

  return (
    <div>
      <h2 className="text-center text-6xl font-bold mb-10">
        Our <span className="text-blue-600">Services</span>
      </h2>
      {loading ? (
        <div className="text-center py-20 text-lg text-gray-400">
          <Loading />
        </div>
      ) : (
        <>
          <div
            className={`grid md:grid-cols-3 gap-5 transition-opacity duration-300 ${fade ? "opacity-0" : "opacity-100"}`}
          >
            {paginated.map((service) => (
              <ServiceCard key={service._id} service={service} />
            ))}
          </div>
          <Pagination
            total={services.length}
            page={page}
            setPage={handleSetPage}
            pageSize={pageSize}
          />
        </>
      )}
    </div>
  );
}
