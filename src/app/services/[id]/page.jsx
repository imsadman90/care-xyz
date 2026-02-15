import { getSingleService } from "@/actions/server/service";
import CartButton from "@/components/buttons/CartButtons";
import React from "react";
import { FaStar, FaCheckCircle, FaShieldAlt, FaTruck } from "react-icons/fa";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const service = await getSingleService(id);

  return {
    title: service.title,
    description:
      service.description.slice(0, 160) ||
      "Educational toy designed to help kids learn through play.",

    openGraph: {
      title: service.title,
      description:
        "Fun and educational learning toy for kids. Safe, colorful, and engaging.",
      images: [
        {
          url: service.image || "https://i.ibb.co.com/Ld7J2ZYq/image.png",
          width: 1200,
          height: 630,
          alt: service.title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: service.title,
      description: "Fun and educational learning toy for kids.",
      images: [service.image || "https://i.ibb.co.com/Ld7J2ZYq/image.png"],
    },
  };
}

const ServiceDetails = async ({ params }) => {
  const { id } = await params;
  const service = await getSingleService(id);

  const {
    title,
    image,
    price,
    discount,
    ratings,
    reviews,
    sold,
    description,
    info,
    qna,
  } = service;

  const discountedPrice = price - (price * discount) / 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Hero Section with Breadcrumb */}
      <section className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        {/* Main Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
          {/* Left Column - Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="group relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 shadow-[0_8px_30px_-4px_rgba(0,0,0,0.15)]">
              <img
                src={image}
                alt={title}
                width={800}
                height={600}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

              {/* Discount Badge */}
              {discount > 0 && (
                <div className="absolute top-6 left-6 bg-gradient-to-r from-rose-500 to-red-500 text-white text-sm font-bold px-4 py-2 rounded-full shadow-xl border-2 border-white/30 backdrop-blur-sm animate-pulse">
                  {discount}% OFF
                </div>
              )}

              {/* Sold Badge */}
              {sold > 0 && (
                <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-md text-slate-900 text-sm font-semibold px-4 py-2 rounded-full shadow-lg border border-slate-200/50">
                  <span className="text-emerald-600">{sold}</span> sold
                </div>
              )}

              {/* Price Badge */}
              <div className="absolute bottom-6 left-6 flex items-center gap-2 bg-white/95 backdrop-blur-md rounded-2xl px-5 py-3 shadow-xl border border-slate-200/50">
                <div className="flex flex-col">
                  {discount > 0 && (
                    <span className="text-xs text-slate-500 line-through">
                      BDT {price}
                    </span>
                  )}
                  <div className="flex items-baseline gap-1">
                    <span className="text-xs font-medium text-slate-600">
                      BDT
                    </span>
                    <span className="text-2xl font-bold text-slate-900">
                      {discountedPrice}
                    </span>
                  </div>
                </div>
              </div>

              {/* Hover Zoom Indicator */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-xl">
                  <svg
                    className="w-6 h-6 text-slate-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-3">
              <div className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <FaShieldAlt className="w-5 h-5 text-emerald-500" />
                <span className="text-xs font-medium text-slate-700 text-center">
                  Secure Payment
                </span>
              </div>
              <div className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <FaTruck className="w-5 h-5 text-teal-500" />
                <span className="text-xs font-medium text-slate-700 text-center">
                  Fast Delivery
                </span>
              </div>
              <div className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <FaCheckCircle className="w-5 h-5 text-cyan-500" />
                <span className="text-xs font-medium text-slate-700 text-center">
                  Quality Assured
                </span>
              </div>
            </div>
          </div>

          {/* Right Column - Product Info */}
          <div className="flex flex-col gap-6">
            {/* Title */}
            <div className="space-y-3">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
                {title}
              </h1>

              {/* Rating & Reviews */}
              <div className="flex items-center gap-4 py-3 border-y border-slate-200">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }, (_, i) => (
                      <FaStar
                        key={i}
                        className={`w-5 h-5 transition-colors ${
                          i < Math.round(ratings)
                            ? "text-amber-400 drop-shadow-sm"
                            : "text-slate-200"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-lg font-semibold text-slate-900">
                    {ratings.toFixed(1)}
                  </span>
                </div>
                <div className="h-5 w-px bg-slate-300" />
                <span className="text-sm text-slate-600 font-medium">
                  {reviews} {reviews === 1 ? "review" : "reviews"}
                </span>
              </div>
            </div>

            {/* Price (Mobile) */}
            <div className="lg:hidden flex items-center gap-3 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-200">
              <div className="flex flex-col">
                {discount > 0 && (
                  <span className="text-sm text-slate-500 line-through">
                    BDT {price}
                  </span>
                )}
                <div className="flex items-baseline gap-1">
                  <span className="text-sm font-medium text-slate-700">
                    BDT
                  </span>
                  <span className="text-3xl font-bold text-slate-900">
                    {discountedPrice}
                  </span>
                </div>
              </div>
              {discount > 0 && (
                <div className="ml-auto bg-rose-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  Save {discount}%
                </div>
              )}
            </div>

            {/* Cart Button */}
            <div className="w-full">
              <CartButton
                service={{ ...service, _id: service._id.toString() }}
              />
            </div>

            {/* Key Features */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="bg-gradient-to-r from-slate-50 to-slate-100 px-6 py-4 border-b border-slate-200">
                <h3 className="text-lg font-bold text-slate-900">
                  Key Features
                </h3>
              </div>
              <ul className="p-6 space-y-3">
                {info?.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-700">
                    <FaCheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Additional Info Cards */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl border border-emerald-200">
                <div className="text-2xl font-bold text-emerald-600">
                  {sold}+
                </div>
                <div className="text-sm text-slate-600 mt-1">
                  Happy Customers
                </div>
              </div>
              <div className="p-4 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl border border-amber-200">
                <div className="text-2xl font-bold text-amber-600">
                  {ratings}
                </div>
                <div className="text-sm text-slate-600 mt-1">Star Rating</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section - Description & Q&A */}
        <div className="space-y-8">
          {/* Section Headers */}
          <div className="flex items-center gap-2">
            <div className="h-1 w-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full" />
            <h2 className="text-2xl font-bold text-slate-900">
              Details & Support
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Description */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <div className="bg-gradient-to-r from-slate-50 to-slate-100 px-6 py-4 border-b border-slate-200">
                <h2 className="text-xl font-bold text-slate-900">
                  Description
                </h2>
              </div>
              <div className="p-6 space-y-4 text-slate-700 leading-relaxed">
                {description?.split("\n\n").map((para, idx) => (
                  <p key={idx} className="text-base">
                    {para}
                  </p>
                ))}
              </div>
            </div>

            {/* Q&A */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <div className="bg-gradient-to-r from-slate-50 to-slate-100 px-6 py-4 border-b border-slate-200">
                <h2 className="text-xl font-bold text-slate-900">
                  Questions & Answers
                </h2>
              </div>
              <div className="p-6 space-y-4 max-h-[500px] overflow-y-auto">
                {qna?.length ? (
                  qna.map((item, i) => (
                    <div
                      key={i}
                      className="p-4 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border border-slate-200 hover:border-emerald-300 transition-colors"
                    >
                      <p className="font-semibold text-slate-900 mb-2 flex items-start gap-2">
                        <span className="text-emerald-600 flex-shrink-0">
                          Q:
                        </span>
                        <span>{item.question}</span>
                      </p>
                      <p className="text-sm text-slate-600 flex items-start gap-2 pl-5">
                        <span className="text-teal-600 flex-shrink-0 font-semibold">
                          A:
                        </span>
                        <span>{item.answer}</span>
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 mx-auto mb-4 bg-slate-100 rounded-full flex items-center justify-center">
                      <svg
                        className="w-8 h-8 text-slate-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <p className="text-slate-500 italic">
                      No questions yet. Be the first to ask!
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 p-8 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-2xl shadow-xl text-white">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h3 className="text-2xl md:text-3xl font-bold">
              Ready to get started?
            </h3>
            <p className="text-emerald-50">
              Join thousands of satisfied customers who trust our services.
            </p>
            <div className="pt-4">
              <CartButton
                service={{ ...service, _id: service._id.toString() }}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetails;
