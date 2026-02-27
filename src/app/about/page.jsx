"use client";
import { FaRocket, FaRegHeart } from "react-icons/fa";
import { FiEye, FiLock, FiUsers } from "react-icons/fi";
import { HiOutlineLightBulb } from "react-icons/hi";
export default function AboutPage() {
  return (
    <main className="bg-[#f8fafc] pb-16 mt-14">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10 px-4 pt-12 pb-8">
        <div className="flex-1">
          <span className="inline-block bg-blue-100 text-sky-700 px-4 py-1 rounded-full text-xs font-semibold mb-4">
            About Us
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
            Our Story <br />
            Providing Care with <span className="text-sky-600">Compassion</span>
          </h1>
          <p className="text-lg text-gray-700 mb-6 max-w-xl">
            At Care.xyz, we believe everyone deserves high-quality, trustworthy
            care in the comfort of their own home. We’re on a mission to
            redefine the caregiving experience.
          </p>
          <div className="flex gap-4 mb-4">
            <a
              href="/register"
              className="btn bg-blue-600 text-white font-semibold px-6 py-2 rounded-full shadow hover:bg-blue-700 transition"
            >
              Get Started
            </a>
            <a
              href="/services"
              className="btn bg-green-50 border-green-400 border-2 text-green-600 font-semibold px-6 py-2 rounded-full shadow hover:bg-blue-50 transition"
            >
              Our Services
            </a>
          </div>
        </div>
        <div className="flex-1 flex justify-center">
          <img
            src="https://thumbs.dreamstime.com/b/m-431550668.jpg"
            alt="Caregivers"
            className="w-full max-w-md rounded-2xl shadow-xl"
          />
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-4 mb-14">
        <div className="bg-white rounded-xl shadow p-8 flex flex-col items-start">
          <div className="bg-blue-100 text-sky-600 rounded-full p-2 mb-3">
            <FaRocket className="text-2xl" />
          </div>
          <h3 className="text-xl font-bold mb-2">Our Mission</h3>
          <p className="text-gray-600">
            To connect families with verified, compassionate caregivers through
            a seamless and secure platform, ensuring peace of mind for every
            household we touch.
          </p>
        </div>
        <div className="bg-white rounded-xl shadow p-8 flex flex-col items-start">
          <div className="bg-teal-100 text-teal-600 rounded-full p-2 mb-3">
            <FiEye className="text-2xl" />
          </div>
          <h3 className="text-xl font-bold mb-2">Our Vision</h3>
          <p className="text-gray-600">
            To be the most trusted global partner in personalized caregiving,
            setting the gold standard for safety, innovation, and human
            connection.
          </p>
        </div>
      </section>

      {/* Core Values */}
      <section className="max-w-6xl mx-auto px-4 mb-14">
        <h2 className="text-2xl font-bold text-center mb-2">Our Core Values</h2>
        <p className="text-gray-500 text-center mb-8">
          The principles that guide every interaction and decision we make.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <FiLock className="text-2xl mb-2 text-sky-600" />
            <h4 className="font-semibold mb-1">Trust</h4>
            <p className="text-gray-500 text-sm text-center">
              Rigorous vetting and background checks for complete peace of mind.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <FaRegHeart className="text-2xl mb-2 text-teal-600" />
            <h4 className="font-semibold mb-1">Compassion</h4>
            <p className="text-gray-500 text-sm text-center">
              Heart-centered care that treats every individual with dignity and
              warmth.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <HiOutlineLightBulb className="text-2xl mb-2 text-yellow-500" />
            <h4 className="font-semibold mb-1">Innovation</h4>
            <p className="text-gray-500 text-sm text-center">
              Easy booking, real-time updates, and smart caregiver matching
              technology.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <FiUsers className="text-2xl mb-2 text-purple-600" />
            <h4 className="font-semibold mb-1">Community</h4>
            <p className="text-gray-500 text-sm text-center">
              Building a robust support network for families and caregivers
              alike.
            </p>
          </div>
        </div>
      </section>

      {/* Journey Section */}
      <section className="max-w-6xl mx-auto px-4 mb-14 flex flex-col md:flex-row items-center gap-10">
        <div className="flex-1">
          <h3 className="text-2xl font-bold mb-3">
            A Journey Born from Personal Experience
          </h3>
          <p className="text-gray-700 mb-4">
            Care.xyz didn’t start in a boardroom; it started in a living room.
            When our founders struggled to find reliable, compassionate care for
            their own aging parents, they realized the system was broken.
          </p>
          <p className="text-gray-700 mb-4">
            We saw firsthand how difficult it was to verify credentials, ensure
            safety, and find that “spark” of human connection. We decided to
            build the solution ourselves—a platform that prioritizes people over
            paperwork.
          </p>
          <p className="text-gray-700 mb-6">
            Since our launch in 2020, we’ve helped over 10,000 families find
            caregivers who don’t just “do the job,” but become extensions of
            their families. Every feature we build is designed with one question
            in mind:{" "}
            <span className="italic text-sky-700">
              “Would I trust this for my own loved ones?”
            </span>
          </p>
          <div className="flex gap-8 mt-6">
            <div>
              <span className="text-2xl font-bold text-sky-700">10k+</span>
              <div className="text-xs text-gray-500">FAMILIES SERVED</div>
            </div>
            <div>
              <span className="text-2xl font-bold text-teal-600">500+</span>
              <div className="text-xs text-gray-500">VERIFIED CAREGIVERS</div>
            </div>
          </div>
        </div>
        <div className="flex-1 flex gap-6 justify-center">
          <img
            src="https://images.pexels.com/photos/38136/pexels-photo-38136.jpeg?cs=srgb&dl=pexels-veeterzy-38136.jpg&fm=jpg"
            alt="Growth"
            className="w-40 h-40 object-cover rounded-xl shadow"
          />
          <img
            src="https://images.pexels.com/photos/53435/tree-oak-landscape-view-53435.jpeg?cs=srgb&dl=pexels-pixabay-53435.jpg&fm=jpg"
            alt="Growth"
            className="w-40 h-40 object-cover rounded-xl shadow"
          />
        </div>
      </section>

      {/* Leadership Section */}
      <section className="max-w-6xl mx-auto px-4 mb-14">
        <h3 className="text-2xl font-bold mb-2 text-center">
          Meet Our Leadership
        </h3>
        <p className="text-gray-500 text-center mb-8">
          The passionate team behind the platform.
        </p>
        <div className="flex flex-wrap justify-center gap-8">
          <div className="flex flex-col items-center">
            <img
              src="https://plus.unsplash.com/premium_photo-1689551670902-19b441a6afde?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww"
              alt="Sarah Jenkins"
              className="w-24 h-24 rounded-xl mb-2 object-cover bg-gray-100"
            />
            <div className="font-semibold">Sarah Jenkins</div>
            <div className="text-xs text-gray-400">Founder & CEO</div>
          </div>
          <div className="flex flex-col items-center">
            <img
              src="https://media.istockphoto.com/id/2063799507/photo/business-portrait-and-black-man-in-city-outdoor-for-career-or-job-of-businessman-face.jpg?s=612x612&w=0&k=20&c=DB5oXy7_aasPbpr7zfpfV92ZYsPIQfFWLyweKEz_UVs="
              alt="David Chen"
              className="w-24 h-24 rounded-xl mb-2 object-cover bg-gray-100"
            />
            <div className="font-semibold">David Chen</div>
            <div className="text-xs text-gray-400">Head of Care Operations</div>
          </div>
          <div className="flex flex-col items-center">
            <img
              src="https://media.istockphoto.com/id/1482996923/photo/portrait-of-young-indian-woman-happy-with-internship-in-human-resources-opportunity-and.jpg?s=612x612&w=0&k=20&c=RXMBNOxKH6AzTF9sWgQvUbEwvm6no698K1H8SnXKPok="
              alt="Elena Rodriguez"
              className="w-24 h-24 rounded-xl mb-2 object-cover bg-gray-100"
            />
            <div className="font-semibold">Elena Rodriguez</div>
            <div className="text-xs text-gray-400">Chief Product Officer</div>
          </div>
          <div className="flex flex-col items-center">
            <img
              src="https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHJhbmRvbSUyMHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D"
              alt="Marcus Thorne"
              className="w-24 h-24 rounded-xl mb-2 object-cover bg-gray-100"
            />
            <div className="font-semibold">Marcus Thorne</div>
            <div className="text-xs text-gray-400">CTO</div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="max-w-3xl mx-auto px-4">
        <div className="bg-gray-10 border-2 border-gray-400 rounded-lg shadow p-10 flex flex-col items-center text-gray-700 text-center">
          <h3 className="text-2xl font-bold mb-2">
            Join Our Growing Community
          </h3>
          <p className="mb-6">
            Whether you’re looking for care or looking to provide it, we’re here
            for you. Start your journey with Care.xyz today.
          </p>
          <div className="">
            <a
              href="/services"
              className="btn bg-blue-400 hover:bg-blue-500 text-white font-semibold px-6 py-2 shadow border-none rounded-full"
            >
              Find Care
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
