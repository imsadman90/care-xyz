"use client";

import React from "react";
import {
  FiShield,
  FiHeart,
  FiClock,
  FiDollarSign,
  FiCalendar,
  FiMonitor,
} from "react-icons/fi";

export default function WhyChoose() {
  const items = [
    {
      icon: <FiShield size={20} />,
      title: "Vetted Professionals",
      desc: "Peace of mind comes first. Every caregiver undergoes rigorous background checks, identity verification, and professional certifications.",
    },
    {
      icon: <FiHeart size={20} />,
      title: "Emotional Match",
      desc: "It's more than just care; it's a connection. We help you find the right personality fit based on interests, temperament, and family culture.",
    },
    {
      icon: <FiClock size={20} />,
      title: "24/7 Support",
      desc: "Our dedicated care coordination team is available around the clock to assist with emergencies, scheduling changes, or any concerns.",
    },
    {
      icon: <FiDollarSign size={20} />,
      title: "Transparent Pricing",
      desc: "Clear, upfront costs with no hidden registration fees or surprise service charges. You pay exactly what you see, simple and honest.",
    },
    {
      icon: <FiCalendar size={20} />,
      title: "Flexible Scheduling",
      desc: "Care on your terms. Book by the hour for short errands or by the day for full-time support. Adjust your schedule anytime through our app.",
    },
    {
      icon: <FiMonitor size={20} />,
      title: "Quality Monitoring",
      desc: "We maintain high standards through regular family check-ins and performance reviews, ensuring consistent, high-quality care every day.",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="text-center max-w-3xl mx-auto">
        <div className="text-sm text-sky-600 font-semibold mb-3">
          OUR PROMISE
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-700">
          Why Choose Us?
        </h2>
        <p className="mt-3 text-slate-500">
          We provide a safe, reliable, and compassionate environment designed
          specifically to meet the unique needs of your loved ones.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((it, idx) => (
          <div
            key={idx}
            className="bg-white rounded-lg border border-slate-100 p-5 shadow-sm"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 flex items-center justify-center rounded-full px-3 bg-sky-50 text-sky-600">
                {it.icon}
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-800">
                  {it.title}
                </div>
                <div className="text-sm text-slate-500 mt-2">{it.desc}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 bg-slate-50 rounded-lg py-12">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-slate-900">
            Ready to find the perfect care?
          </h3>
          <p className="mt-3 text-slate-500">
            Join thousands of families who trust Care.xyz for professional,
            compassionate, and reliable caregiving services.
          </p>

          <div className="mt-6 flex items-center justify-center gap-4">
            <a
              href="/services"
              className="inline-block px-6 py-3 bg-sky-50 border-sky-400  text-sky-600 border-2 rounded-full shadow hover:bg-sky-100"
            >
              Get Started Now
            </a>
            <a
              href="/contact"
              className="inline-block px-6 py-3 border-2 border-green-400 rounded-full text-green-600 bg-green-50 hover:bg-green-100"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
