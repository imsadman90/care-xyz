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

  // Duration and location state
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

  // Dynamic total cost calculation
  const totalPrice = useMemo(() => {
    let base = cartItems.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0,
    );
    // Example: multiply by duration (days or hours)
    return durationType === "days"
      ? base * durationValue
      : base * (durationValue / 24);
  }, [cartItems, durationType, durationValue]);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    const form = e.target;

    const payload = {
      name: form.name.value,
      email: form.email.value,
      contact: form.contactNo.value,
      address: location.address,
      instruction: form.specialInstruction.value,
      durationType,
      durationValue,
      location,
      status: "Pending",
    };
    console.log(payload);

    const result = await createOrder(payload);
    if (result.success) {
      Swal.fire(
        "অর্ডার সম্পন্ন হলো",
        "অর্ডার টি ৭ দিনের ভেতর আপনার কাছে পৌছে যাবে। ইমেইল চেক করুন।",
        "success",
      );
      router.push("/");
    } else {
      Swal.fire("error", "Something Went wrong", "error");
      router.push("/cart");
    }
    setLoading(false);
  };

  if (session.status == "loading") {
    return <h2>Loading..</h2>;
  }

  return (
    <div className="flex relative gap-10 py-20 flex-col-reverse  md:flex-row ">
      <div
        className={` ${
          loading ? " flex opacity-80 inset-0 absolute" : "hidden"
        }  z-20 glass w-full  h-full  justify-center items-center gap-4`}
      >
        <AiOutlineLoading
          size={50}
          className="animate-spin text-primary font-bold"
        />
        <h2 className={`text-xl font-bold animate-pulse`}>
          {" "}
          Processing CheckOut{" "}
        </h2>
      </div>
      {/* LEFT: FORM */}
      <div className="flex-2">
        <h2 className="text-2xl font-bold my-4">Order Details</h2>
        <form
          className="space-y-4 bg-base-100 p-6 shadow-md rounded-lg"
          onSubmit={handleSubmit}
        >
          {/* NAME + EMAIL IN ONE ROW */}
          <div className="flex gap-4">
            <div className="flex-1">
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
            <div className="flex-1">
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

          {/* Step 1: Select Duration */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block font-medium mb-1">Duration Type</label>
              <select
                className="input input-bordered w-full"
                value={durationType}
                onChange={(e) => setDurationType(e.target.value)}
                required
              >
                <option value="days">Days</option>
                <option value="hours">Hours</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block font-medium mb-1">Duration</label>
              <input
                type="number"
                min={1}
                max={durationType === "days" ? 30 : 24}
                className="input input-bordered w-full"
                value={durationValue}
                onChange={(e) => setDurationValue(Number(e.target.value))}
                required
              />
            </div>
          </div>

          {/* Step 2: Select Location */}
          <div className="grid grid-cols-2 gap-4">
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
          <div>
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

          {/* Step 3: Special Instruction */}
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

          {/* Step 4: Contact No */}
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
            className="btn bg-gradient-to-r from-purple-600 via-violet-600 to-fuchsia-600 text-white w-full mt-4"
          >
            Confirm & Place Order
          </button>
        </form>
      </div>

      {/* RIGHT: ITEMS SUMMARY */}
      <div className="flex-1 ">
        <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
        <div className="bg-base-100 p-4 shadow-md rounded-lg space-y-2 sticky top-4">
          {cartItems.map((item) => (
            <div key={item._id} className="flex justify-between border-b pb-1">
              <div>
                <p className="font-medium">{item.title}</p>
                <p className="text-xs text-gray-500">
                  Qty: {item.quantity} × Taka : {item.price}
                </p>
              </div>
              <p className="font-semibold">
                Taka : {item.quantity * item.price}
              </p>
            </div>
          ))}

          <div className="divider"></div>

          <div className="flex justify-between font-bold text-lg">
            <span>Total ({totalItems} items)</span>
            <span>Taka : {totalPrice.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
