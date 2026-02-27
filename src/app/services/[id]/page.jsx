import { getSingleService } from "@/actions/server/service";
import CartButton from "@/components/buttons/CartButtons";
import Link from "next/link";
import React from "react";
import { FaStar, FaCheckCircle, FaShieldAlt, FaTruck } from "react-icons/fa";
import { Ri24HoursFill, RiFirstAidKitLine } from "react-icons/ri";
import { TbFileReport, TbNurse } from "react-icons/tb";

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
    <div className="pt-25">
      <div className="max-w-7xl mx-auto px-4">
        {/* Top Section: Image + Info */}
        <div className="flex flex-col lg:flex-row gap-10 items-start mb-12">
          {/* Left: Image Card */}
          <div className="flex-1 flex justify-center">
            <div className=" rounded-3xl shadow-xl  relative w-full max-w-xl flex flex-col items-center">
              <img
                src={image}
                alt={title}
                width={480}
                height={400}
                className="rounded-2xl object-cover w-full h-[340px] md:h-[400px]"
              />
              {/* Badge */}
              <div className="absolute -bottom-1/18 right-0 bg-white rounded-xl shadow flex items-center gap-2 px-4 py-2 border border-gray-100">
                <span className="inline-flex items-center justify-center w-6 h-6 bg-green-100 rounded-full">
                  <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
                    <path
                      d="M8 14.667A6.667 6.667 0 1 0 8 1.333a6.667 6.667 0 0 0 0 13.334Z"
                      stroke="#22C55E"
                      strokeWidth="1.5"
                    />
                    <path
                      d="m5.667 8.667 1.666 1.666 3-3"
                      stroke="#22C55E"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className="text-xs font-semibold text-gray-700">
                  VERIFIED CARE
                  <br />
                  <span className="text-green-600 font-bold">
                    Background Checked
                  </span>
                </span>
              </div>
            </div>
          </div>
          {/* Right: Info */}
          <div className="flex-1 flex flex-col gap-4 lg:pl-6">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">
              {title}
            </h1>
            <div className="flex items-center gap-2 mb-2">
              {/* Stars */}
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }, (_, i) => (
                  <FaStar
                    key={i}
                    className={`w-5 h-5 ${i < Math.round(ratings) ? "text-amber-400" : "text-gray-200"}`}
                  />
                ))}
              </div>
              <span className="text-lg font-semibold text-gray-900 ml-2">
                {ratings.toFixed(1)}
              </span>
              <span className="text-gray-500 text-sm">
                ({reviews.toLocaleString()} Reviews)
              </span>
              {/* Sold count */}
              <span className="text-green-600 text-sm font-semibold ml-4">
                {sold?.toLocaleString()} Sold
              </span>
            </div>
            <p className="text-gray-700 text-lg mb-4">
              {description?.split("\n\n")[0]}
            </p>
            <div className="flex items-end gap-2 mb-4">
              <span className="text-3xl font-extrabold text-gray-900">
                ${price}
              </span>
              <span className="text-gray-500 text-lg">/ hour</span>
            </div>
            {/* Features Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className="flex  items-center gap-2 text-gray-700 text-sm font-medium">
                <Ri24HoursFill size={30} className="text-blue-600" />
                24/7 Availability
              </div>
              <div className="flex items-center gap-2 text-gray-700 text-sm font-medium">
                <RiFirstAidKitLine size={30} className="text-blue-600" />
                CPR & First Aid Certified
              </div>
              <div className="flex items-center gap-2 text-gray-700 text-sm font-medium">
                <TbNurse size={30} className="text-blue-600" />
                Vetted Caregivers
              </div>
              <div className="flex items-center gap-2 text-gray-700 text-sm font-medium">
                <TbFileReport size={30} className="text-blue-600" />
                Activity Reporting
              </div>
            </div>
          </div>
        </div>
        {/* About Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              About This Service
            </h2>
            <p className="text-gray-700 text-base mb-6">{description}</p>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              What's included
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 mb-8">
              {info?.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 text-green-700 text-base"
                >
                  <svg
                    className="w-5 h-5 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {item}
                </div>
              ))}
            </div>
            {/* Q&A Section */}
            {qna && qna.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Q&A</h3>
                <ul className="space-y-4">
                  {qna.map((qa, idx) => (
                    <li
                      key={idx}
                      className="bg-gray-50 rounded-xl p-4 border border-gray-200"
                    >
                      <div className="font-semibold text-sky-700 mb-1">
                        Q: {qa.question}
                      </div>
                      <div className="text-gray-700">A: {qa.answer}</div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Booking Summary */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 h-fit">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Booking Summary
            </h3>
            <p className="text-gray-600 mb-4">
              Quick and secure booking with instant confirmation.
            </p>
            <div className="flex justify-between text-base mb-2">
              <span>Hourly Rate</span>
              <span>${price.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-base mb-2">
              <span>Service Fee</span>
              <span>${(price * 0.1).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg font-bold mb-4">
              <span>Total</span>
              <span className="text-blue-600">
                ${(price * 1.1).toFixed(2)} / hr
              </span>
            </div>
            <CartButton service={service} />
            <p className="text-xs text-gray-400 text-center">
              No commitment required. Cancel anytime.
            </p>
          </div>
        </div>
        {/* Safety Assurance */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-8">
          <div className="flex items-center gap-2 mb-2">
            <svg
              className="w-6 h-6 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="10" strokeWidth="2" />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4"
              />
            </svg>
            <span className="text-lg font-bold text-blue-900">
              Safety Assurance
            </span>
          </div>
          <p className="text-blue-900 mb-4">
            Trust is our foundation. We use industry-leading verification tools
            to ensure your family's safety.
          </p>
          <ol className="list-decimal list-inside space-y-2 text-blue-900">
            <li>
              <span className="font-bold">Background Verification</span>
              <br />
              <span className="text-sky-700 text-sm">
                Every caregiver passes a multi-state criminal background check
                and sex offender registry search.
              </span>
            </li>
            <li>
              <span className="font-bold">Certification Check</span>
              <br />
              <span className="text-sky-700 text-sm">
                We verify all certifications including CPR, First Aid, and early
                education degrees.
              </span>
            </li>
            <li>
              <span className="font-bold">Insurance Coverage</span>
              <br />
              <span className="text-sky-700 text-sm">
                All bookings through Care.xyz are protected by our $1M liability
                insurance policy.
              </span>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;
