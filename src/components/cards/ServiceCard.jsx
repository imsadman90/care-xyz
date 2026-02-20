"use client";
import Link from "next/link";
import { FaStar } from "react-icons/fa";
import CartButton from "../buttons/CartButtons";

const ServiceCard = ({ service }) => {
  const { title, image, description, _id } = service;

  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="bg-blue-50 rounded-2xl overflow-hidden shadow-md flex flex-col h-full">
        {/* Image on top */}
        <div className="w-full h-56 bg-gray-50 flex items-center justify-center overflow-hidden">
          <img
            src={image}
            alt={title}
            width={400}
            height={224}
            className="w-full h-full object-cover"
          />
        </div>
        {/* Content */}
        <div className="flex flex-col flex-1 px-6 py-5">
          <h2 className="text-xl font-extrabold text-gray-900 mb-1">{title}</h2>
          <p className="text-gray-700 text-sm mb-6 flex-1">
            {description.length > 90
              ? description.slice(0, 90) + "..."
              : description}
          </p>
          <Link
            href={`/services/${_id}`}
            className="inline-flex items-center text-blue-600 font-semibold text-base hover:underline mt-auto"
          >
            View Details
            <svg
              className="w-5 h-5 ml-1"
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
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
