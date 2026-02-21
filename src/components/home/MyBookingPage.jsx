"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

import { FaUserNurse, FaPaw, FaWheelchair, FaShieldAlt } from "react-icons/fa";
import { PiBaby } from "react-icons/pi";

const MyBookingPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Modal state
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter state for status tabs
  const [filter, setFilter] = useState("All");

  // Redirect to login if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status, router]);

  const statusOptions = [
    { label: "All", color: "gray" },
    { label: "Pending", color: "yellow" },
    { label: "Confirmed", color: "blue" },
    { label: "Completed", color: "green" },
    { label: "Cancelled", color: "red" },
  ];

  const filteredOrders =
    filter === "All" ? orders : orders.filter((o) => o.status === filter);

  useEffect(() => {
    if (!session?.user?.email) return;
    const fetchOrders = async () => {
      try {
        const res = await fetch(`/api/orders?email=${session.user.email}`);
        const data = await res.json();
        setOrders(data);
        console.log(data);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [session]);

  const handleCancel = async (orderId) => {
    const result = await Swal.fire({
      title: "Cancel Booking?",
      text: "Are you sure you want to cancel this booking?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, cancel it!",
    });

    if (result.isConfirmed) {
      try {
        await fetch(`/api/orders/${orderId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "Cancelled" }),
        });
        setOrders((prev) =>
          prev.map((o) =>
            o._id === orderId ? { ...o, status: "Cancelled" } : o,
          ),
        );
        Swal.fire("Cancelled!", "Your booking has been cancelled.", "success");
      } catch (err) {
        Swal.fire("Error", "Failed to cancel booking.", "error");
      }
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      Pending: "bg-yellow-100 text-yellow-700 border border-yellow-300",
      Confirmed: "bg-blue-100 text-blue-700 border border-blue-300",
      Completed: "bg-green-100 text-green-700 border border-green-300",
      Cancelled: "bg-red-100 text-red-700 border border-red-300",
    };
    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-semibold ${
          styles[status] || "bg-gray-100 text-gray-600"
        }`}
      >
        {status}
      </span>
    );
  };

  const getServiceIcon = (order) => {
    const title = order.items?.[0]?.title?.toLowerCase() || "";
    if (title.includes("baby"))
      return (
        <span className="inline-flex w-8 h-8 rounded-full bg-yellow-100 items-center justify-center mr-2 text-xl">
          <PiBaby className="text-yellow-500" />
        </span>
      );
    if (title.includes("elderly"))
      return (
        <span className="inline-flex w-8 h-8 rounded-full bg-blue-100 items-center justify-center mr-2 text-xl">
          <FaUserNurse className="text-blue-500" />
        </span>
      );
    if (title.includes("pet"))
      return (
        <span className="inline-flex w-8 h-8 rounded-full bg-green-100 items-center justify-center mr-2 text-xl">
          <FaPaw className="text-green-500" />
        </span>
      );
    if (title.includes("special"))
      return (
        <span className="inline-flex w-8 h-8 rounded-full bg-red-100 items-center justify-center mr-2 text-xl">
          <FaWheelchair className="text-red-500" />
        </span>
      );
    return (
      <span className="inline-flex w-8 h-8 rounded-full bg-gray-100 items-center justify-center mr-2 text-xl">
        <FaShieldAlt className="text-gray-500" />
      </span>
    );
  };

  if (status === "unauthenticated") {
    return null;
  }
  return (
    <div className="min-h-screen bg-[#f7fafd] py-10 px-2 sm:px-6 lg:px-8">
      {/* Order Details Modal */}
      {showModal && selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 bg-opacity-40">
          <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl font-bold"
              onClick={() => setShowModal(false)}
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4">Order Details</h2>
            <div className="space-y-2">
              <div>
                <span className="font-semibold">Order ID:</span>{" "}
                {selectedOrder._id}
              </div>
              <div>
                <span className="font-semibold">Service Name:</span>{" "}
                {selectedOrder.items?.[0]?.title ?? "—"}
              </div>
              <div>
                <span className="font-semibold">Location:</span>{" "}
                {selectedOrder.location ?? "—"}
              </div>
              <div>
                <span className="font-semibold">Duration:</span>{" "}
                {selectedOrder.duration ?? "—"}
              </div>
              <div>
                <span className="font-semibold">Total Cost:</span> $
                {selectedOrder.totalPrice ?? "—"}
              </div>
              <div>
                <span className="font-semibold">Status:</span>{" "}
                {selectedOrder.status}
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <div>
            <h2 className="text-4xl font-extrabold text-blue-600 mb-1">
              My Bookings
            </h2>
            <p className="text-gray-500 text-base">
              Manage and track your care services
            </p>
          </div>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-50 border-blue-400 border-2 text-blue-600 font-semibold shadow hover:bg-blue-100 transition text-lg"
          >
            <span className="text-2xl font-bold">+</span> Book New Service
          </Link>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {statusOptions.map((opt) => (
            <button
              key={opt.label}
              className={`px-5 py-2 rounded-full font-semibold border transition text-sm ${
                filter === opt.label
                  ? `bg-${opt.color}-100 text-${opt.color}-700 border-${opt.color}-300`
                  : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
              }`}
              onClick={() => setFilter(opt.label)}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-2xl shadow bg-white">
          {loading ? (
            <div className="text-center py-12 text-gray-400">
              Loading bookings...
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Service Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Duration
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Total Cost
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-8 text-gray-400">
                      No bookings found.
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => (
                    <tr key={order._id} className="hover:bg-blue-50 transition">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center font-semibold text-gray-900">
                          {getServiceIcon(order)}
                          {order.items?.length > 0 ? order.items[0].title : "—"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-700 font-medium">
                        {order.duration}{" "}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                        {order.location
                          ? order.location.split(" ").slice(0, 4).join(" ") +
                            (order.location.split(" ").length > 4 ? "..." : "")
                          : "—"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-700 font-semibold">
                        ${order.totalPrice ?? "—"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(order.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setSelectedOrder(order);
                              setShowModal(true);
                            }}
                            className="px-3 py-1 text-xs rounded-full bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100 transition font-semibold"
                          >
                            View
                          </button>
                          {order.status !== "Cancelled" &&
                            order.status !== "Completed" && (
                              <button
                                onClick={() => handleCancel(order._id)}
                                className="px-3 py-1 text-xs rounded-full bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 transition font-semibold"
                              >
                                Cancel
                              </button>
                            )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyBookingPage;
