// HowItWorks.jsx - Home page section
"use client";
import {
  FaUserPlus,
  FaRegCalendarCheck,
  FaLock,
  FaRegHeart,
} from "react-icons/fa";
import { MdVerifiedUser, MdSupportAgent } from "react-icons/md";

export default function HowItWorks() {
  return (
    <section className="bg-white py-20 px-2">
      <div className="max-w-5xl mx-auto flex flex-col items-center">
        <span className="bg-blue-50 text-blue-700 px-4 py-1 rounded-full text-xs font-semibold mb-4">
          SEAMLESS SUPPORT
        </span>
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-3 text-blue-600">
          HOW CARE.xyz WORKS
        </h2>
        <p className="text-gray-600 text-center mb-8 max-w-2xl">
          Providing peace of mind for your family through a simple, vetted
          caregiving process that puts your loved ones first.
        </p>
        <div className="w-full flex justify-center mb-12">
          <img
            src="https://media.istockphoto.com/id/953772938/photo/close-up-of-senior-hands-giving-small-plant-to-a-child.jpg?s=612x612&w=0&k=20&c=01eF3bk2nPyhDoG-0pODLdlQf18oWd1Y5mU3iKvRPho="
            alt="Care Process"
            className="rounded-2xl shadow-lg w-full max-w-lg object-cover"
          />
        </div>
        {/* Choose Path */}
        <div className="w-full text-center mb-12">
          <h3 className="text-2xl font-bold mb-2">Choose Your Path</h3>
          <p className="text-gray-500 mb-4">
            Our platform is designed to serve both those looking for help and
            those ready to give it.
          </p>
          <div className="inline-flex gap-2">
            <button className="px-6 py-2 rounded-full bg-blue-50 border-blue-400 border-2 text-blue-600 font-semibold">
              For Families
            </button>
            <button className="px-6 py-2 rounded-full bg-green-50 border-green-400 border-2 text-green-600 font-semibold">
              For Caregivers
            </button>
          </div>
        </div>
        {/* Steps */}
        <div className="w-full mb-12">
          <h3 className="text-2xl font-bold text-center mb-6">
            Your Journey to Quality Care
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-blue-50 rounded-xl p-6 flex flex-col items-center text-center shadow">
              <FaUserPlus className="text-3xl text-blue-600 mb-2" />
              <div className="font-bold mb-1">STEP 01</div>
              <div className="font-semibold mb-1">Create an Account</div>
              <p className="text-gray-500 text-sm">
                Sign up to initiate. Search and connect with trusted, vetted
                caregivers available in your local area.
              </p>
            </div>
            <div className="bg-blue-50 rounded-xl p-6 flex flex-col items-center text-center shadow">
              <FaRegCalendarCheck className="text-3xl text-blue-600 mb-2" />
              <div className="font-bold mb-1">STEP 02</div>
              <div className="font-semibold mb-1">Book a Service</div>
              <p className="text-gray-500 text-sm">
                Choose the right care for your needs, schedule instantly through
                our integrated calendar.
              </p>
            </div>
            <div className="bg-blue-50 rounded-xl p-6 flex flex-col items-center text-center shadow">
              <FaLock className="text-3xl text-blue-600 mb-2" />
              <div className="font-bold mb-1">STEP 03</div>
              <div className="font-semibold mb-1">Secure Payment</div>
              <p className="text-gray-500 text-sm">
                Pay easily and securely. All major cards accepted, with full
                transparency and automated scheduling.
              </p>
            </div>
            <div className="bg-blue-50 rounded-xl p-6 flex flex-col items-center text-center shadow">
              <FaRegHeart className="text-3xl text-blue-600 mb-2" />
              <div className="font-bold mb-1">STEP 04</div>
              <div className="font-semibold mb-1">Quality Care</div>
              <p className="text-gray-500 text-sm">
                Receive professional care and continuous support, always
                delivered with the highest standards of compassion.
              </p>
            </div>
          </div>
        </div>
        {/* Safety First */}
        <div className="w-full bg-green-50 border-2 border-green-400 rounded-2xl p-8 flex flex-col md:flex-row items-center gap-8 shadow">
          <div className="flex-1">
            <span className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-xs font-semibold mb-2 inline-block">
              SAFETY FIRST
            </span>
            <h4 className="text-xl font-bold mb-2">
              Vetted for Your Peace of Mind
            </h4>
            <p className="text-gray-600 mb-4">
              Every caregiver on Care.xyz undergoes rigorous multi-step
              screening before joining our community.
            </p>
            <ul className="text-gray-700 text-sm space-y-1 mb-2">
              <li>✔️ Comprehensive background checks</li>
              <li>✔️ Identity and certification verification</li>
              <li>✔️ 24/7 dedicated safety support team</li>
            </ul>
          </div>
          <div className="flex-1 grid grid-cols-2 gap-4">
            <div className="bg-white rounded-xl p-4 flex flex-col items-center shadow">
              <MdVerifiedUser className="text-3xl text-green-600 mb-1" />
              <div className="font-semibold">Background Checked</div>
            </div>
            <div className="bg-white rounded-xl p-4 flex flex-col items-center shadow">
              <FaUserPlus className="text-3xl text-green-600 mb-1" />
              <div className="font-semibold">Verified Caregivers</div>
            </div>
            <div className="bg-white rounded-xl p-4 flex flex-col items-center shadow">
              <MdSupportAgent className="text-3xl text-green-600 mb-1" />
              <div className="font-semibold">24/7 Care & Support</div>
            </div>
            <div className="bg-white rounded-xl p-4 flex flex-col items-center shadow">
              <FaRegHeart className="text-3xl text-green-600 mb-1" />
              <div className="font-semibold">Satisfaction Guaranteed</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
