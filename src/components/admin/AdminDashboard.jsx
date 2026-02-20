"use client";
import React, { useEffect, useState } from "react";
import OrdersTable from "@/components/admin/OrdersTable";

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/admin-orders")
      .then(async (res) => {
        const data = await res.json();
        console.log("Admin Orders API response:", data);
        console.log("Response status:", res.status);
        console.log("Response OK:", res.ok);

        if (!res.ok) {
          setError(data.error || "Failed to fetch orders");
          setOrders([]);
        } else {
          // Check if data is an array
          if (Array.isArray(data)) {
            setOrders(data);
            console.log("Orders set:", data.length);
          } else {
            console.error("Data is not an array:", data);
            setError("Invalid data format received");
            setOrders([]);
          }
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Network error:", err);
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
      console.error("Error updating order:", error);
      alert("Error updating order");
    }
  };

  return (
    <div className="admin-dashboard-container">
      <section>
        {loading && <p>Loading orders...</p>}
        {!loading && !error && orders.length === 0 && (
          <p>No orders found. Check console for debug info.</p>
        )}
        {!loading && !error && orders.length > 0 && (
          <>
            <OrdersTable orders={orders} onAction={handleAction} />
          </>
        )}
      </section>
    </div>
  );
}
