"use client";
import Link from "next/link";
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
      "Yes, we prioritize your privacy and use advanced security measures to protect your personal and health information at every step.",
  },
  {
    question: "How can I contact support?",
    answer:
      "You can reach our support team via the Contact page or email us directly at support@carexyz.com. We are here to help you 24/7.",
  },
];

const FAQSection = () => {
  const [openIdx, setOpenIdx] = useState(null);

  return (
    <section className="min-h-screen bg-gray-100 flex items-center justify-center px-5 py-16 font-sans">
      <div className="w-full max-w-[680px]">
        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-4">
          <span className="h-px w-8 bg-teal-700" />
          <span className="text-[11px] font-medium tracking-[0.14em] uppercase text-teal-700">
            Support Center
          </span>
        </div>

        {/* Heading */}
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#1a2a25] leading-tight tracking-tight mb-3">
          Questions worth
          <br />
          asking.
        </h2>
        <p className="text-[15px] text-gray-700 mb-12 leading-relaxed">
          Everything you need to know about CareXYZ and how it works.
        </p>

        {/* FAQ Items */}
        <div>
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className={`border-b border-[#e2ddd6] ${idx === 0 ? "border-t" : ""}`}
              >
                <button
                  type="button"
                  className="w-full flex items-center gap-5 py-6 text-left group cursor-pointer bg-transparent border-none outline-none"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${idx}`}
                >
                  {/* Number */}
                  <span
                    className={`flex-shrink-0 w-6 font-serif text-xs font-semibold transition-colors duration-300 ${
                      isOpen ? "text-teal-700" : "text-[#c8c0b4]"
                    }`}
                  >
                    0{idx + 1}
                  </span>

                  {/* Question */}
                  <span
                    className={`flex-1 text-base font-medium leading-snug transition-colors duration-300 ${
                      isOpen
                        ? "text-teal-700"
                        : "text-[#1a2a25] group-hover:text-teal-700"
                    }`}
                  >
                    {faq.question}
                  </span>

                  {/* Icon: + rotates to × */}
                  <span
                    className={`flex-shrink-0 w-8 h-8 rounded-full border flex items-center justify-center relative transition-all duration-300 ${
                      isOpen
                        ? "border-teal-700 bg-teal-700 rotate-45"
                        : "border-[#d5cfc8] bg-transparent rotate-0"
                    }`}
                    aria-hidden="true"
                  >
                    <span
                      className={`absolute w-3 h-px rounded transition-colors duration-300 ${
                        isOpen ? "bg-white" : "bg-[#7a8a85]"
                      }`}
                    />
                    <span
                      className={`absolute w-px h-3 rounded transition-colors duration-300 ${
                        isOpen ? "bg-white" : "bg-[#7a8a85]"
                      }`}
                    />
                  </span>
                </button>

                {/* Answer */}
                <div
                  id={`faq-answer-${idx}`}
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    isOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
                  }`}
                  aria-hidden={!isOpen}
                >
                  <p className="pb-6 pl-11 text-sm text-gray-700 leading-[1.75]">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer CTA */}
        <div className="mt-12 flex items-center justify-between gap-4 bg-white rounded-2xl px-8 py-7 shadow-sm">
          <div>
            <p className="text-[15px] font-medium text-[#1a2a25] mb-1">
              Still have questions?
            </p>
            <p className="text-sm font-light text-[#7a8a85] leading-snug">
              Our team is happy to help you anytime.
            </p>
          </div>
          <Link href="/contact"
            className="flex-shrink-0 bg-teal-700 hover:bg-teal-800 text-white text-sm font-medium rounded-full px-6 py-3 transition-all duration-200 hover:-translate-y-px cursor-pointer whitespace-nowrap"
          >
            Contact support
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
