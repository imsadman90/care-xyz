"use client";
import React from "react";

const testimonials = [
  {
    name: "Ayesha Rahman",
    title: "Parent, Dhaka",
    quote:
      "CareXYZ has been a game-changer for our family. The service is reliable, professional, and truly cares about our needs.",
    avatar:
      "https://media.istockphoto.com/id/1194745993/photo/smiling-muslim-woman-wearing-hijab.jpg?s=612x612&w=0&k=20&c=8yu_OxGaAiDQas7hjLBy8-CnjY40r5Gxw06dZV8lxFs=",
  },
  {
    name: "Md. Hasan",
    title: "Entrepreneur, Chittagong",
    quote:
      "I was amazed by the efficiency and compassion of the CareXYZ team. Highly recommended for anyone seeking quality care services!",
    avatar:
      "https://images.unsplash.com/photo-1530268729831-4b0b9e170218?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHJhbmRvbSUyMHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    name: "Shamima Begum",
    title: "Teacher, Sylhet",
    quote:
      "The booking process was seamless and the caregivers are top-notch. I feel secure knowing my loved ones are in good hands.",
    avatar:
      "https://img.freepik.com/free-photo/happy-successful-muslim-businesswoman-posing-outside_74855-2007.jpg?semt=ais_user_personalization&w=740&q=80",
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
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4 text-gray-600">
          What Our Clients Say
        </h2>
        <p className="text-center text-gray-500 mb-12 text-lg">
          Real stories from real people. We are proud to make a difference.
        </p>
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-gray-50 border-gray-200 border-2  shadow-lg p-8 flex flex-col items-center hover:shadow-2xl transition-shadow duration-300"
            >
              <img
                src={t.avatar}
                alt={t.name}
                className="w-20 h-20 rounded-full object-cover mb-4 border-4 border-gray-200 shadow"
              />
              <blockquote className="italic text-gray-700 mb-4 text-center">
                “{t.quote}”
              </blockquote>
              <div className="font-semibold text-gray-600">{t.name}</div>
              <div className="text-sm text-gray-400">{t.title}</div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {metrics.map((m, idx) => (
            <div
              key={idx}
              className="bg-gray-50 border-gray-200 border-2 shadow p-6"
            >
              <div className="text-3xl text-gray-600 mb-2">
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
