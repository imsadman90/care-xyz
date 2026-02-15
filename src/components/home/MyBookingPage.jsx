"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import Loading from "@/app/loading";

const MyBookingPage = () => {
  const { data: session, status } = useSession();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  // Cancel booking handler
  const handleCancelBooking = async (orderId) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This will cancel your booking and remove it from your bookings.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, cancel it!",
    });
    if (confirm.isConfirmed) {
      setLoading(true);
      const res = await fetch(`/api/my-booking?orderId=${orderId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setOrders((prev) => prev.filter((o) => o._id !== orderId));
        Swal.fire("Cancelled!", "Your booking has been cancelled.", "success");
      } else {
        Swal.fire("Error", "Failed to cancel booking.", "error");
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/my-booking")
        .then((res) => res.json())
        .then((data) => {
          setOrders(data.orders || []);
          setLoading(false);
        });
    } else if (status !== "loading") {
      setLoading(false);
    }
  }, [status]);

  if (loading) return <Loading></Loading>;
  if (!session)
    return (
      <div className="py-20 text-center">
        Please{" "}
        <Link href="/login" className="text-purple-600 underline">
          login
        </Link>{" "}
        to view your bookings.
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto py-12 px-2 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold mb-8 text-purple-700 text-center">
        My Bookings
      </h2>
      {orders.length === 0 ? (
        <div className="text-center text-gray-500">No bookings found.</div>
      ) : (
        <div className="overflow-x-auto rounded-xl shadow-lg bg-white">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-purple-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-bold text-purple-700 uppercase tracking-wider">
                  Order #
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold text-purple-700 uppercase tracking-wider">
                  Service Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold text-purple-700 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold text-purple-700 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold text-purple-700 uppercase tracking-wider">
                  Total Cost
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold text-purple-700 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold text-purple-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {orders.map((order) => (
                <tr key={order._id} className="hover:bg-purple-50 transition">
                  <td className="px-4 py-3 font-semibold text-purple-700 whitespace-nowrap">
                    #{order._id.slice(-6)}
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-700">
                    {order.items && order.items.length > 0
                      ? order.items.map((item) => item.title).join(", ")
                      : "—"}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {order.durationValue} {order.durationType}
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-700">
                    {[
                      order.location?.division,
                      order.location?.district,
                      order.location?.city,
                      order.location?.area,
                      order.location?.address,
                    ]
                      .filter(Boolean)
                      .join(", ")}
                  </td>
                  <td className="px-4 py-3 font-bold text-purple-700 whitespace-nowrap">
                    Taka : {order.totalPrice?.toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${order.status === "Pending" ? "bg-yellow-100 text-yellow-700" : order.status === "Confirmed" ? "bg-blue-100 text-blue-700" : order.status === "Completed" ? "bg-green-100 text-green-700" : order.status === "Cancelled" ? "bg-red-100 text-red-700" : "bg-gray-100 text-gray-700"}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <button
                      className="btn btn-xs btn-outline border-purple-300 text-purple-700 mr-2"
                      onClick={() => {
                        if (order.items && order.items.length > 0) {
                          router.push(`/services/${order.items[0].serviceId}`);
                        }
                      }}
                    >
                      View Details
                    </button>
                    {order.status === "Pending" ||
                    order.status === "Confirmed" ? (
                      <button
                        className="btn btn-xs btn-outline border-red-300 text-red-700"
                        onClick={() => handleCancelBooking(order._id)}
                      >
                        Cancel Booking
                      </button>
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyBookingPage;
