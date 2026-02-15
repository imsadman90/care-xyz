import React from "react";

const Banner = () => {
  return (
    <div className="flex flex-col-reverse md:flex-row justify-between items-center mt-10">
      <div className="flex-1 space-y-5 text-center md:text-left">
        <h2 className="text-7xl font-bold leading-20">
          <span className="bg-gradient-to-r from-purple-600 via-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
            Caregiving Motivation
          </span>
        </h2>
        <p className="">Buy Every toy with up to 15% Discount</p>
        <button className="btn border-purple-500 border-2 btn-outline">
          Expore services
        </button>
      </div>
      <div className="flex-1">
        <img
          alt="Caregiving Motivation"
          src="https://i.ibb.co/hRnKqNVY/Screenshot-2026-02-15-185351.png"
          width={700}
          height={700}
          className="rounded-4xl shadow-lg mx-auto"
        />
      </div>
    </div>
  );
};

export default Banner;
