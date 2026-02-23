"use client";
import React, { useEffect, useState } from "react";
import OrdersTable from "@/components/admin/OrdersTable";

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch("/api/admin-orders")
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          setError(data.error || "Failed to fetch orders");
          setOrders([]);
        } else {
          if (Array.isArray(data)) {
            setOrders(data);
          } else {
            setError("Invalid data format received");
            setOrders([]);
          }
        }
        setLoading(false);
      })
      .catch((err) => {
        setError("Network error: " + err.message);
        setLoading(false);
      });
  }, []);

  const handleAction = async (orderId, action) => {
    let feedback = "";
    if (action === "feedback") {
      feedback = prompt("Enter feedback for user:");
      if (!feedback) return;
    }

    try {
      const res = await fetch("/api/admin-orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, action, feedback }),
      });

      if (res.ok) {
        const updated = await res.json();
        setOrders((prev) =>
          prev.map((o) => (o._id === updated._id ? updated : o)),
        );
      } else {
        const errorData = await res.json();
        alert("Error: " + (errorData.error || "Unknown error"));
      }
    } catch (error) {
      alert("Error updating order");
    }
  };

  const filteredOrders = orders.filter((o) => {
    const q = searchQuery.toLowerCase();
    return (
      o._id?.toLowerCase().includes(q) ||
      o.user?.name?.toLowerCase().includes(q) ||
      o.user?.email?.toLowerCase().includes(q) ||
      o.service?.title?.toLowerCase().includes(q) ||
      o.status?.toLowerCase().includes(q)
    );
  });

  const stats = {
    total: orders.length,
    approved: orders.filter((o) => o.status === "approved").length,
    pending: orders.filter((o) => o.status === "pending").length,
    rejected: orders.filter((o) => o.status === "rejected").length,
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
          All Bookings
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Manage and review all customer orders
        </p>
      </div>

      {/* Stats Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          {
            label: "Total",
            value: stats.total,
            color: "text-gray-700",
            bg: "bg-gray-50 border-gray-200",
          },
          {
            label: "Approved",
            value: stats.approved,
            color: "text-emerald-700",
            bg: "bg-emerald-50 border-emerald-200",
          },
          {
            label: "Pending",
            value: stats.pending,
            color: "text-amber-700",
            bg: "bg-amber-50 border-amber-200",
          },
          {
            label: "Rejected",
            value: stats.rejected,
            color: "text-red-700",
            bg: "bg-red-50 border-red-200",
          },
        ].map((s) => (
          <div
            key={s.label}
            className={`rounded-xl border p-4 flex flex-col items-center justify-center ${s.bg}`}
          >
            <span className={`text-2xl font-bold ${s.color}`}>{s.value}</span>
            <span className="text-xs text-gray-500 mt-0.5 font-medium">
              {s.label}
            </span>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="mb-4">
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by user, service, status, or ID..."
            className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white"
          />
        </div>
      </div>

      {/* Content */}
      {loading && (
        <div className="flex items-center justify-center py-20">
          <div className="flex flex-col items-center gap-3 text-gray-400">
            <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin" />
            <span className="text-sm">Loading orders...</span>
          </div>
        </div>
      )}

      {!loading && error && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-5 py-4 text-red-700 text-sm">
         {error}
        </div>
      )}

      {!loading && !error && orders.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400">
          <span className="text-4xl mb-3">📋</span>
          <p className="text-sm font-medium">No orders found</p>
        </div>
      )}

      {!loading && !error && orders.length > 0 && (
        <>
          {filteredOrders.length === 0 ? (
            <div className="text-center py-12 text-gray-400 text-sm">
              No results match your search.
            </div>
          ) : (
            <OrdersTable orders={filteredOrders} onAction={handleAction} />
          )}
          <p className="text-xs text-gray-400 mt-4 text-right">
            Showing {filteredOrders.length} of {orders.length} orders
          </p>
        </>
      )}
    </div>
  );
}
