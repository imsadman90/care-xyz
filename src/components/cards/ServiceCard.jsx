"use client";
import Link from "next/link";
import { FaStar } from "react-icons/fa";
import CartButton from "../buttons/CartButtons";

const ServiceCard = ({ service }) => {
  const { title, image, price, ratings, reviews, sold, _id } = service;

  return (
    <div className="group relative w-full max-w-sm mx-auto">
      {/* Main Card Container */}
      <div className="relative bg-gradient-to-br from-slate-50 via-white to-slate-50 rounded-2xl overflow-hidden border border-slate-200/60 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] transition-all duration-500 hover:shadow-[0_20px_40px_-8px_rgba(0,0,0,0.15)] hover:border-slate-300/80">
        {/* Image Container with Overlay Effects */}
        <div className="relative h-56 overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
          <img
            src={image}
            alt={title}
            width={400}
            height={224}
            className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:brightness-95"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Price Badge - Premium Design */}
          <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-white/95 backdrop-blur-md text-slate-900 rounded-full px-4 py-2 shadow-lg border border-slate-200/50 transition-all duration-300 group-hover:scale-105 group-hover:bg-white">
            <span className="text-xs font-medium text-slate-600">BDT</span>
            <span className="text-lg font-bold tracking-tight">{price}</span>
          </div>

          {/* Sold Badge */}
          {sold > 0 && (
            <div className="absolute top-4 right-4 bg-emerald-500/90 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-md border border-emerald-400/30 transition-all duration-300 group-hover:scale-105 group-hover:bg-emerald-500">
              {sold} sold
            </div>
          )}

          {/* Hover Accent Line */}
          <div className="" />
        </div>

        {/* Content Section */}
        <div className="p-5 space-y-4">
          {/* Title */}
          <h2 className="text-xl font-bold text-slate-900 leading-snug line-clamp-2 min-h-[3.5rem] transition-colors duration-300 group-hover:text-slate-700">
            {title}
          </h2>

          {/* Rating Section */}
          <div className="flex items-center justify-between py-2 border-y border-slate-100">
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }, (_, i) => (
                  <FaStar
                    key={i}
                    className={`w-4 h-4 transition-all duration-300 ${
                      i < Math.round(ratings)
                        ? "text-amber-400 drop-shadow-sm"
                        : "text-slate-200"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-semibold text-slate-700">
                {ratings.toFixed(1)}
              </span>
            </div>
            <span className="text-xs text-slate-500 font-medium">
              {reviews} {reviews === 1 ? "review" : "reviews"}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-2.5 pt-1">
            {/* Cart Button - Full Width */}
            <div className="w-full">
              <CartButton service={{ ...service, _id: _id.toString() }} />
            </div>

            {/* View Details Link */}
            <Link
              href={`/services/${_id}`}
              className="group/link relative w-full text-center px-5 py-2.5 text-sm font-semibold text-slate-700 bg-white border-2 border-slate-200 rounded-full overflow-hidden transition-all duration-300 hover:border-slate-300 hover:shadow-md hover:-translate-y-0.5"
            >
              {/* Animated Background */}
              <span className="absolute inset-0 bg-gradient-to-r from-emerald-50 via-teal-50 to-cyan-50 transform -translate-x-full group-hover/link:translate-x-0 transition-transform duration-500 ease-out" />

              {/* Text */}
              <span className="relative z-10 flex items-center justify-center gap-2">
                View Details
                <svg
                  className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </span>
            </Link>
          </div>
        </div>

        {/* Corner Accent - Subtle Design Detail */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-emerald-500/5 to-transparent rounded-bl-full transform translate-x-12 -translate-y-12 group-hover:translate-x-8 group-hover:-translate-y-8 transition-transform duration-700" />
      </div>

      {/* Floating Shadow Effect */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-emerald-500/10 via-teal-500/10 to-cyan-500/10 rounded-2xl blur-2xl transform scale-95 opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
    </div>
  );
};

export default ServiceCard;
