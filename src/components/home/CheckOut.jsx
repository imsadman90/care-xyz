"use client";
import { createOrder } from "@/actions/server/order";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useMemo, useEffect } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import Swal from "sweetalert2";

const CheckOut = ({ cartItems = [] }) => {
  const session = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [durationType, setDurationType] = useState("days");
  const [durationValue, setDurationValue] = useState(1);
  const [location, setLocation] = useState({
    division: "",
    district: "",
    city: "",
    area: "",
    address: "",
  });
  const totalItems = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems],
  );
  const totalPrice = useMemo(() => {
    let base = cartItems.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0,
    );
    return durationType === "days"
      ? base * durationValue
      : base * (durationValue / 24);
  }, [cartItems, durationType, durationValue]);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    const form = e.target;
    // Prepare booking/payment info for Stripe
    const payload = {
      service: cartItems[0]?.title || "Service Booking",
      date: new Date().toLocaleDateString(),
      duration: `${durationValue} ${durationType}`,
      location: `${location.address}, ${location.city}, ${location.district}, ${location.division}`,
      amount: totalPrice,
    };

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url; // Redirect to Stripe
      } else {
        Swal.fire("Error", data.error || "Stripe session failed", "error");
      }
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
    setLoading(false);
  };

  if (session.status == "loading") {
    return <h2>Loading..</h2>;
  }

  return (
    <div className="min-h-screen  py-8">
      {/* Stepper */}
      <div className="max-w-3xl mx-auto mb-8">
        <div className="flex items-center justify-between">
          <div className="flex flex-col items-center flex-1">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
              1
            </div>
            <span className="mt-2 text-sky-700 font-semibold">Duration</span>
          </div>
          <div className="flex-1 h-1 bg-blue-100 mx-2 relative">
            <div
              className="absolute left-0 top-0 h-1 bg-blue-500"
              style={{ width: "50%" }}
            />
          </div>
          <div className="flex flex-col items-center flex-1">
            <div className="w-8 h-8 rounded-full bg-white border-2 border-blue-200 text-sky-500 flex items-center justify-center font-bold text-lg">
              2
            </div>
            <span className="mt-2 text-sky-700 font-semibold">Location</span>
          </div>
          <div className="flex-1 h-1 bg-blue-100 mx-2 relative">
            <div
              className="absolute left-0 top-0 h-1 bg-blue-200"
              style={{ width: "50%" }}
            />
          </div>
          <div className="flex flex-col items-center flex-1">
            <div className="w-8 h-8 rounded-full bg-white border-2 border-blue-200 text-sky-500 flex items-center justify-center font-bold text-lg">
              3
            </div>
            <span className="mt-2 text-sky-700 font-semibold">Summary</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto flex flex-col gap-8">
        {/* Duration Card */}
        <div className="bg-white rounded-2xl shadow p-8 mb-4">
          <h2 className="text-2xl font-bold mb-2">
            How long do you need care?
          </h2>
          <p className="text-gray-500 mb-6">
            Select the duration and frequency for your service.
          </p>
          <div className="mb-4">
            <span className="block font-semibold mb-2">Service Type</span>
            <div className="inline-flex rounded-lg bg-gray-100 overflow-hidden mb-4">
              <button
                type="button"
                className={`px-6 py-2 font-semibold text-sm transition ${durationType === "hours" ? "bg-blue-600 text-white" : "text-gray-700"}`}
                onClick={() => setDurationType("hours")}
              >
                Hours
              </button>
              <button
                type="button"
                className={`px-6 py-2 font-semibold text-sm transition ${durationType === "days" ? "bg-blue-600 text-white" : "text-gray-700"}`}
                onClick={() => setDurationType("days")}
              >
                Days
              </button>
            </div>
          </div>
          <div className="mb-6">
            <span className="block font-semibold mb-2">Quantity</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-2xl font-bold text-sky-600 bg-white"
                onClick={() => setDurationValue(Math.max(1, durationValue - 1))}
              >
                -
              </button>
              <input
                type="number"
                min={1}
                value={durationValue}
                onChange={(e) => setDurationValue(Number(e.target.value))}
                className="w-20 h-10 text-center border border-gray-200 rounded-lg text-lg font-semibold"
              />
              <button
                type="button"
                className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-2xl font-bold text-sky-600 bg-white"
                onClick={() => setDurationValue(durationValue + 1)}
              >
                +
              </button>
            </div>
          </div>
          <div className="bg-blue-50 rounded-xl flex items-center gap-3 px-4 py-3 mt-4">
            <svg
              className="w-6 h-6 text-sky-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 9V7a5 5 0 0 0-10 0v2a2 2 0 0 1-2 2v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7a2 2 0 0 1-2-2z"
              />
            </svg>
            <span className="font-medium text-blue-900">
              Estimated Total Cost
            </span>
            <span className="ml-auto font-bold text-sky-700 text-lg">
              Estimated: ${totalPrice.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Location Card */}
        <div className="bg-white rounded-2xl shadow p-8 mb-4">
          <h2 className="text-2xl font-bold mb-2">Location Details</h2>
          <p className="text-gray-500 mb-6">
            Tell us where the service will be provided.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <div>
              <label className="block font-medium mb-1">Division</label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={location.division}
                onChange={(e) =>
                  setLocation((l) => ({ ...l, division: e.target.value }))
                }
                required
              />
            </div>
            <div>
              <label className="block font-medium mb-1">District</label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={location.district}
                onChange={(e) =>
                  setLocation((l) => ({ ...l, district: e.target.value }))
                }
                required
              />
            </div>
            <div>
              <label className="block font-medium mb-1">City</label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={location.city}
                onChange={(e) =>
                  setLocation((l) => ({ ...l, city: e.target.value }))
                }
                required
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Area</label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={location.area}
                onChange={(e) =>
                  setLocation((l) => ({ ...l, area: e.target.value }))
                }
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-1">Full Address</label>
            <textarea
              className="textarea textarea-bordered w-full"
              rows={2}
              value={location.address}
              onChange={(e) =>
                setLocation((l) => ({ ...l, address: e.target.value }))
              }
              required
            ></textarea>
          </div>
        </div>

        {/* Summary Card */}
        <div className="bg-white rounded-2xl shadow p-8 mb-4">
          <h2 className="text-2xl font-bold mb-2">Order Summary</h2>
          <div className="mb-4">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex justify-between border-b pb-1 mb-2"
              >
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-xs text-gray-500">
                    Qty: {item.quantity} × ${item.price}
                  </p>
                </div>
                <p className="font-semibold">
                  ${(item.quantity * item.price).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
          <div className="flex justify-between font-bold text-lg mb-4">
            <span>Total ({totalItems} items)</span>
            <span>${totalPrice.toLocaleString()}</span>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* User Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={session?.data?.user?.name}
                  className="input input-bordered w-full"
                  required
                  readOnly
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={session?.data?.user?.email}
                  className="input input-bordered w-full"
                  required
                  readOnly
                />
              </div>
            </div>
            {/* Special Instruction */}
            <div>
              <label className="block font-medium mb-1">
                Special Instruction
              </label>
              <textarea
                name="specialInstruction"
                className="textarea textarea-bordered w-full"
                rows={2}
              ></textarea>
            </div>
            {/* Contact No */}
            <div>
              <label className="block font-medium mb-1">Contact No</label>
              <input
                type="tel"
                name="contactNo"
                className="input input-bordered w-full"
                required
              />
            </div>
            <button
              disabled={cartItems.length == 0 || loading}
              type="submit"
              className="btn bg-blue-600 hover:bg-blue-700 text-white w-full mt-4 font-semibold text-lg"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <AiOutlineLoading size={24} className="animate-spin" />{" "}
                  Processing CheckOut
                </span>
              ) : (
                "Confirm & Place Order"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
