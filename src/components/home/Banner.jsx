import React from "react";

const Banner = () => {
  return (
    <section className="w-full bg-gradient-to-br from-[#f7fafd] to-[#f3f6fb] py-16 mt-14 px-2 md:px-0">
      <div className="max-w-7xl px-10 mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left: Text content */}
        <div className="flex-1 max-w-xl md:pr-8 text-center md:text-left">
          <span className="inline-block mb-4 px-4 py-1 rounded-full bg-blue-100 text-sky-700 text-xs font-semibold tracking-wide">
            TRUSTED BY 500+ FAMILIES
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-4">
            Reliable & Trusted
            <br />
            Care Services for
            <br />
            Your Loved Ones
          </h1>
          <p className="text-gray-600 text-lg mb-8">
            Book professional babysitters, elderly caregivers & special care
            services easily with our vetted team of experts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button className="px-6 py-3 rounded-full bg-blue-50 border-blue-400 border-2 text-sky-600 font-semibold shadow">
              Explore Services
            </button>
            <button className="px-6 py-3 rounded-full border-green-400 text-green-600 font-semibold bg-green-50 border-2">
              Book Now
            </button>
          </div>
        </div>
        {/* Right: Image with badge */}
        <div className="relative">
          <div className="rounded-xl relative">
            <img
              alt="Caregiving family illustration"
              src="https://thumbs.dreamstime.com/b/m-431550668.jpg"
              width={420}
              height={420}
              className="rounded-2xl object-cover w-[320px] h-[320px] md:w-[380px] md:h-[380px] lg:w-[420px] lg:h-[420px]"
            />
            {/* Badge */}
            <div className="absolute -bottom-5 -left-4 bg-white rounded-xl shadow flex items-center gap-2 px-4 py-2 border border-gray-100">
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
                Safety Guaranteed
                <br />
                <span className="text-green-600 font-bold">
                  100% Verified Staff
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
