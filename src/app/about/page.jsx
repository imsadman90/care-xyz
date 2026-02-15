"use client"
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <motion.section
        className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 rounded-3xl shadow-xl overflow-hidden mb-14 flex flex-col md:flex-row items-center gap-8 p-8 md:p-14"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <motion.div
          className="flex-1 flex flex-col justify-center items-start"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-4 leading-tight">
            Baby Sitting & Elderly Care Service Platform
          </h1>
          <p className="text-lg md:text-xl text-blue-700 mb-6 max-w-xl">
            Trusted, compassionate, and professional care for your loved ones —
            anytime, anywhere.
          </p>
        </motion.div>
        <motion.div
          className="flex-1 flex justify-center"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <img
            src="https://images.unsplash.com/photo-1584515933487-779824d29309?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Caregiving and family support"
            className="w-full max-w-md h-72 object-cover rounded-2xl shadow-lg border-4 border-white"
          />
        </motion.div>
      </motion.section>

      {/* About Section */}
      <motion.section
        className="mb-14 bg-white rounded-2xl shadow p-8 text-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
      >
        {/* ...existing code... */}
        <h2 className="text-3xl font-bold text-blue-800 mb-4 flex items-center justify-center gap-2">
          {/* ...existing code... */}
          About Care.xyz
        </h2>
        <p className="text-gray-600 text-lg w-full mb-3">
          Care.xyz is a modern and reliable caregiving web application designed
          to provide trusted care services for children, elderly individuals,
          and sick family members. Our platform connects families with verified
          and professional caretakers, ensuring safe, secure, and compassionate
          care at home.
        </p>
        <p className="text-gray-600 text-lg w-full">
          In today’s busy world, finding dependable caregiving support can be
          challenging. Care.xyz simplifies this process by allowing users to
          easily browse services, select their preferred duration and location,
          and book care services directly through the platform. Whether it’s
          babysitting, elderly assistance, or special care for sick individuals,
          our goal is to make caregiving accessible, affordable, and stress-free
          for everyone.
        </p>
      </motion.section>

      {/* Mission Section */}
      <motion.section
        className="mb-14 bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl shadow p-8"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
      >
        {/* ...existing code... */}
        <h2 className="text-2xl font-bold text-purple-800 mb-3 flex items-center gap-2">
          {/* ...existing code... */}
          Our Mission
        </h2>
        <p className="text-gray-700 text-lg mx-auto pl-8">
          Our mission is to make caregiving easy, secure, and accessible by
          leveraging technology to connect families with trusted caretakers. We
          aim to build a platform where users can confidently book services and
          track their care journey with transparency.
        </p>
      </motion.section>

      {/* What We Offer Section */}
      <motion.section
        className="mb-14 bg-white rounded-2xl shadow p-8"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
      >
        {/* ...existing code... */}
        <h2 className="text-2xl font-bold text-blue-800 mb-3 flex items-center gap-2">
          {/* ...existing code... */}
          What We Offer
        </h2>
        <div className="flex flex-col md:flex-row gap-8 justify-center">
          {/* ...existing code... */}
        </div>
      </motion.section>

      {/* Platform Highlights Section */}
      <motion.section
        className="mb-14 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl shadow p-8"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
      >
        {/* ...existing code... */}
        <h2 className="text-2xl font-bold text-blue-800 mb-3 flex items-center gap-2">
          {/* ...existing code... */}
          Platform Highlights
        </h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 text-lg max-w-4xl mx-auto list-none">
          {/* ...existing code... */}
        </ul>
      </motion.section>

      {/* Security & Trust Section */}
      <motion.section
        className="mb-14 bg-white rounded-2xl shadow p-8"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
      >
        {/* ...existing code... */}
        <h2 className="text-2xl font-bold text-purple-800 mb-3 flex items-center gap-2">
          {/* ...existing code... */}
          Security & Trust
        </h2>
        <p className="text-gray-700 text-lg pl-8">
          We prioritize user security and data protection. All configuration
          keys are securely managed using environment variables. Private routes
          ensure that only authenticated users can access booking and tracking
          features.
        </p>
      </motion.section>

      {/* Closing Statement Section */}
      <motion.section
        className="mb-6 text-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.7, ease: "easeOut" }}
      >
        {/* ...existing code... */}
        <p className="text-xl text-blue-900 font-semibold max-w-2xl mx-auto">
          At Care.xyz, we believe that every family deserves dependable and
          professional care services. Our platform is built with care,
          compassion, and commitment — because your loved ones deserve the best.{" "}
          {/* ...existing code... */}
        </p>
      </motion.section>
    </main>
  );
}
