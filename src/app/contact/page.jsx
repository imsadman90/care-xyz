import React from "react";

const ContactPage = () => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 to-white flex items-center justify-center p-4">
      <section className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8 border border-purple-100">
        <h1 className="text-3xl font-bold text-purple-700 mb-2">Contact Us</h1>
        <p className="text-gray-600 mb-6">
          We'd love to hear from you! Fill out the form below and our team will
          get back to you as soon as possible.
        </p>
        <form className="space-y-5">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="mt-2 block w-full py-2 px-5 rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              placeholder="Your Name"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="mt-2 px-5 py-2  block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              className="mt-2 px-5 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              placeholder="How can we help you?"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-md shadow transition"
          >
            Send Message
          </button>
        </form>
        <div className="mt-8 text-center text-gray-500 text-sm">
          Or email us directly at{" "}
          <a
            href="mailto:support@carexyz.com"
            className="text-purple-600 underline"
          >
            support@carexyz.com
          </a>
        </div>
      </section>
    </main>
  );
};

export default ContactPage;
