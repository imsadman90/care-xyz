import React from "react";

const Banner = () => {
  return (
    <div className="flex flex-col-reverse md:flex-row justify-between items-center">
      <div className="flex-1 space-y-5 text-center md:text-left">
        <h2 className="text-6xl font-bold leading-20">
          <span className="text-purple-500">caregiving Motivation</span>
        </h2>
        <p className="">Buy Every toy with up to 15% Discount</p>
        <button className="btn border-purple-500 border-2 btn-outline">Expore services</button>
      </div>
      <div className="flex-1">
        <img
          alt="Caregiving Motivation"
          src="https://agingoutreachservices.com/wp-content/uploads/2023/01/Caregiving-Quote-2-1024x1024.jpg"
          width={500}
          height={500}
          className="rounded-2xl shadow-lg mx-auto"
        />
      </div>
    </div>
  );
};

export default Banner;
