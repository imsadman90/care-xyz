"use client";
import React from "react";
import { useState } from "react";

const faqs = [
  {
    question: "What services does CareXYZ offer?",
    answer:
      "CareXYZ provides a wide range of healthcare and wellness services, including online consultations, home care, and personalized health plans tailored to your needs.",
  },
  {
    question: "How do I book a service?",
    answer:
      "You can easily book a service through our website by navigating to the Services page, selecting your desired service, and following the booking instructions.",
  },
  {
    question: "Is my personal information secure?",
    answer:
      "Yes, we prioritize your privacy and use advanced security measures to protect your personal and health information.",
  },
  {
    question: "How can I contact support?",
    answer:
      "You can reach our support team via the Contact page or email us directly at support@carexyz.com. We are here to help you 24/7.",
  },
];

const FAQSection = () => {
  const [openIdx, setOpenIdx] = useState(0);
  return (
    <section className="max-w-3xl mx-auto my-16 p-8 bg-white rounded-2xl shadow-lg border border-purple-100">
      <h2 className="text-3xl font-bold text-sky-700 mb-6 text-center">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className="border-b border-gray-200 py-4 transition-all"
            >
              <button
                type="button"
                className="w-full flex items-center justify-between text-left text-lg font-semibold text-gray-800 focus:outline-none group"
                onClick={() => setOpenIdx(isOpen ? -1 : idx)}
                aria-expanded={isOpen}
                aria-controls={`faq-content-${idx}`}
              >
                <span className={isOpen ? "text-sky-700" : ""}>
                  {faq.question}
                </span>
                <span
                  className={
                    "ml-2 text-sky-500 transition-transform duration-300" +
                    (isOpen ? " rotate-180" : "")
                  }
                >
                  ▼
                </span>
              </button>
              <div
                id={`faq-content-${idx}`}
                className="overflow-hidden transition-all duration-500 ease-in-out"
                style={{
                  maxHeight: isOpen ? "200px" : "0",
                  opacity: isOpen ? 1 : 0,
                  transition:
                    "max-height 0.5s cubic-bezier(0.4,0,0.2,1), opacity 0.4s",
                }}
                aria-hidden={!isOpen}
              >
                <p className="mt-2 text-gray-600 leading-relaxed pl-1">
                  {faq.answer}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FAQSection;
