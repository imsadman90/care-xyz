"use client";

import React, { useState } from "react";
import {
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineClock,
  HiOutlineLocationMarker,
} from "react-icons/hi";
import { FaPaperPlane } from "react-icons/fa";

const ContactPage = () => {
  return (
    <main className="min-h-screen bg-gray-50">
      <header>
        <div className="max-w-7xl mx-auto py-12 mt-14 px-6 text-center">
          <h1 className="text-3xl font-extrabold text-slate-900">
            Get in Touch
          </h1>
          <p className="mt-2 text-sm text-slate-500 max-w-2xl mx-auto">
            Whether you're a family seeking care or a caregiver looking to help,
            our dedicated team is here to support you every step of the way.
          </p>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Form */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">
              Send us a Message
            </h2>
            <ContactForm />
          </div>

          {/* Right: Contact Info */}
          <aside className="space-y-4">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">
                Contact Information
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-sky-50 text-sky-600">
                    <HiOutlineMail size={20} />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-slate-700">
                      Email Support
                    </div>
                    <div className="text-sm text-slate-500">
                      support@carexyz.com
                    </div>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-sky-50 text-sky-600">
                    <HiOutlinePhone size={20} />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-slate-700">
                      Phone
                    </div>
                    <div className="text-sm text-slate-500">
                      +1 (555) 000-1234
                    </div>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-sky-50 text-sky-600">
                    <HiOutlineClock size={20} />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-slate-700">
                      Working Hours
                    </div>
                    <div className="text-sm text-slate-500">
                      24/7 Support Available
                    </div>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-sky-50 text-sky-600">
                    <HiOutlineLocationMarker size={20} />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-slate-700">
                      Office Address
                    </div>
                    <div className="text-sm text-slate-500">
                      123 Care Street, San Francisco, CA
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h4 className="text-lg font-semibold text-slate-800 mb-3">
                Common Questions
              </h4>
              <div className="space-y-3">
                <div className="border border-slate-200 rounded-md p-3">
                  <div className="text-sm font-medium text-slate-700">
                    How do I verify a caregiver’s background?
                  </div>
                  <div className="text-sm text-slate-500 mt-1">
                    All caregivers on our platform undergo a rigorous multi-step
                    background check and credential verification process.
                  </div>
                </div>

                <div className="border border-slate-200 rounded-md p-3">
                  <div className="text-sm font-medium text-slate-700">
                    What types of care services do you offer?
                  </div>
                  <div className="text-sm text-slate-500 mt-1">
                    We provide access to senior care, child care, pet sitting,
                    and specialized medical assistance from certified
                    professionals.
                  </div>
                </div>

                <div className="border border-slate-200 rounded-md p-3">
                  <div className="text-sm font-medium text-slate-700">
                    How quickly can I find a caregiver?
                  </div>
                  <div className="text-sm text-slate-500 mt-1">
                    Most families find a suitable match within 24-48 hours of
                    posting their requirements on our platform.
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
};

export default ContactPage;

function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("General Inquiry");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to send message");

      setSuccess("Message sent — we'll get back to you shortly.");
      setName("");
      setEmail("");
      setSubject("General Inquiry");
      setMessage("");
    } catch (err) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm text-slate-600">Full Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          className="mt-2 block w-full rounded-md border border-slate-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
          placeholder="Jane Doe"
          required
        />
      </div>

      <div>
        <label className="block text-sm text-slate-600">Email Address</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          className="mt-2 block w-full rounded-md border border-slate-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
          placeholder="jane@example.com"
          required
        />
      </div>

      <div>
        <label className="block text-sm text-slate-600">Subject</label>
        <select
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="mt-2 block w-full rounded-md border border-slate-200 px-4 py-2 bg-white"
        >
          <option>General Inquiry</option>
          <option>Caregiver Application</option>
          <option>Support</option>
        </select>
      </div>

      <div>
        <label className="block text-sm text-slate-600">Message</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={5}
          className="mt-2 block w-full rounded-md border border-slate-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
          placeholder="How can we help you?"
          required
        />
      </div>

      <div className="flex items-center justify-between gap-4">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-md shadow disabled:opacity-60"
        >
          <FaPaperPlane />
          <span>{loading ? "Sending..." : "Send Message"}</span>
        </button>

        <div className="text-sm text-slate-500">
          Or email us at{" "}
          <a
            href="mailto:support@carexyz.com"
            className="text-sky-600 underline"
          >
            support@carexyz.com
          </a>
        </div>
      </div>

      {success && <div className="text-green-600 text-sm">{success}</div>}
      {error && <div className="text-red-600 text-sm">{error}</div>}
    </form>
  );
}
