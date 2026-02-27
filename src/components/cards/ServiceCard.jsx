"use client";
import Link from "next/link";
import { FaStar } from "react-icons/fa";
import CartButton from "../buttons/CartButtons";

const ServiceCard = ({ service }) => {
  const {
    title,
    image,
    description,
    _id,
    rating = 4.5,
    nights = 3,
    tag = "Guest Favorite",
  } = service;

  return (
    <div className="w-full mx-auto">
      <div className="relative rounded-3xl overflow-hidden shadow-xl group h-[400px] flex flex-col justify-end bg-gray-200">
        {/* Background Image */}
        <img
          src={image}
          alt={title}
          width={400}
          height={224}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
        {/* Card Content */}
        <div className="relative p-6 flex flex-col gap-2 text-white">
          <h2 className="text-2xl font-bold mb-1 drop-shadow-lg">{title}</h2>
          <p className="text-sm opacity-90 mb-2 drop-shadow-lg">
            {description.length > 80
              ? description.slice(0, 80) + "..."
              : description}
          </p>
          <Link
            href={`/services/${_id}`}
            className="block w-full mt-2 bg-blue-50 text-gray-600  text-base rounded-full py-3 text-center shadow-lg hover:bg-blue-100 hover:text-sky-700 transition"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
