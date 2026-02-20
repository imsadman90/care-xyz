import React from "react";

export default function OrdersTable({ orders, onAction }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border bg-white rounded shadow text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 font-semibold">Order ID</th>
            <th className="px-4 py-2 font-semibold">User</th>
            <th className="px-4 py-2 font-semibold">Service</th>
            <th className="px-4 py-2 font-semibold">Status</th>
            <th className="px-4 py-2 font-semibold">Feedback</th>
            <th className="px-4 py-2 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id} className="border-t">
              <td className="px-4 py-2 text-xs break-all">{order._id}</td>
              <td className="px-4 py-2">
                {order.user?.name || order.user?.email}
              </td>
              <td className="px-4 py-2">{order.service?.title}</td>
              <td className="px-4 py-2 capitalize">
                <span
                  className={`px-2 py-1 rounded text-xs font-bold 
                  ${order.status === "approved" ? "bg-green-100 text-green-700" : ""}
                  ${order.status === "pending" ? "bg-yellow-100 text-yellow-700" : ""}
                  ${order.status === "rejected" ? "bg-red-100 text-red-700" : ""}
                `}
                >
                  {order.status}
                </span>
              </td>
              <td className="px-4 py-2 text-sm">
                {order.adminFeedback || (
                  <span className="text-gray-400">-</span>
                )}
              </td>
              <td className="px-4 py-2 space-x-2">
                <button
                  className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-xs"
                  onClick={() => onAction(order._id, "approve")}
                  disabled={order.status === "approved"}
                >
                  Approve
                </button>
                <button
                  className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs"
                  onClick={() => onAction(order._id, "reject")}
                  disabled={order.status === "rejected"}
                >
                  Reject
                </button>
                <button
                  className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs"
                  onClick={() => onAction(order._id, "feedback")}
                >
                  Feedback
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
