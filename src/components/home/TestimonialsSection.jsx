"use client"
import React from "react";

const testimonials = [
  {
    name: "Ayesha Rahman",
    title: "Parent, Dhaka",
    quote:
      "CareXYZ has been a game-changer for our family. The service is reliable, professional, and truly cares about our needs.",
    avatar: "/avatars/ayesha.jpg",
  },
  {
    name: "Md. Hasan",
    title: "Entrepreneur, Chittagong",
    quote:
      "I was amazed by the efficiency and compassion of the CareXYZ team. Highly recommended for anyone seeking quality care services!",
    avatar: "/avatars/hasan.jpg",
  },
  {
    name: "Shamima Begum",
    title: "Teacher, Sylhet",
    quote:
      "The booking process was seamless and the caregivers are top-notch. I feel secure knowing my loved ones are in good hands.",
    avatar: "/avatars/shamima.jpg",
  },
];

const metrics = [
  { label: "Happy Clients", value: "5,000+" },
  { label: "Caregivers", value: "300+" },
  { label: "Cities Served", value: "12" },
  { label: "Avg. Rating", value: "4.9/5" },
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-purple-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4 text-purple-700">
          What Our Clients Say
        </h2>
        <p className="text-center text-gray-500 mb-12 text-lg">
          Real stories from real people. We are proud to make a difference.
        </p>
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center hover:shadow-2xl transition-shadow duration-300"
            >
              <img
                src={t.avatar}
                alt={t.name}
                className="w-20 h-20 rounded-full object-cover mb-4 border-4 border-purple-200 shadow"
              />
              <blockquote className="italic text-gray-700 mb-4 text-center">
                “{t.quote}”
              </blockquote>
              <div className="font-semibold text-purple-700">{t.name}</div>
              <div className="text-sm text-gray-400">{t.title}</div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {metrics.map((m, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow p-6">
              <div className="text-3xl font-extrabold text-purple-600 mb-2">
                {m.value}
              </div>
              <div className="text-gray-500 font-medium">{m.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
