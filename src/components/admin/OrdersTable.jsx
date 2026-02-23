import React from "react";

export default function OrdersTable({ orders, onAction }) {
  const statusStyles = {
    approved: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    pending: "bg-amber-50 text-amber-700 border border-amber-200",
    rejected: "bg-red-50 text-red-700 border border-red-200",
  };

  return (
    <div className="w-full">
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto rounded-xl border border-gray-200">
        <table className="min-w-full bg-white text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Order ID
              </th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Service
              </th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Feedback
              </th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {orders.map((order) => (
              <tr
                key={order._id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-5 py-3 text-xs text-gray-400 font-mono max-w-[100px] truncate">
                  {order._id}
                </td>
                <td className="px-5 py-3 font-medium text-gray-800">
                  {order.user?.name || order.user?.email || "—"}
                </td>
                <td className="px-5 py-3 text-gray-600">
                  {order.service?.title || "—"}
                </td>
                <td className="px-5 py-3">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${
                      statusStyles[order.status] ||
                      "bg-gray-100 text-gray-600 border border-gray-200"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-5 py-3 text-sm text-gray-600 max-w-[160px] truncate">
                  {order.adminFeedback || (
                    <span className="text-gray-300">No feedback</span>
                  )}
                </td>
                <td className="px-5 py-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onAction(order._id, "approve")}
                      disabled={order.status === "approved"}
                      className="px-3 py-1.5 bg-emerald-500 text-white rounded-lg text-xs font-semibold hover:bg-emerald-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => onAction(order._id, "reject")}
                      disabled={order.status === "rejected"}
                      className="px-3 py-1.5 bg-red-500 text-white rounded-lg text-xs font-semibold hover:bg-red-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => onAction(order._id, "feedback")}
                      className="px-3 py-1.5 bg-blue-500 text-white rounded-lg text-xs font-semibold hover:bg-blue-600 transition-colors"
                    >
                      Feedback
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card List */}
      <div className="md:hidden flex flex-col gap-4">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="font-semibold text-gray-800 text-sm">
                  {order.user?.name || order.user?.email || "Unknown User"}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {order.service?.title || "No service"}
                </p>
              </div>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${
                  statusStyles[order.status] ||
                  "bg-gray-100 text-gray-600 border border-gray-200"
                }`}
              >
                {order.status}
              </span>
            </div>

            <p className="text-xs font-mono text-gray-300 mb-3 truncate">
              {order._id}
            </p>

            {order.adminFeedback && (
              <div className="bg-blue-50 border border-blue-100 rounded-lg px-3 py-2 text-xs text-blue-700 mb-3">
               {order.adminFeedback}
              </div>
            )}

            <div className="flex gap-2">
              <button
                onClick={() => onAction(order._id, "approve")}
                disabled={order.status === "approved"}
                className="flex-1 py-2 bg-emerald-500 text-white rounded-lg text-xs font-semibold hover:bg-emerald-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                Approve
              </button>
              <button
                onClick={() => onAction(order._id, "reject")}
                disabled={order.status === "rejected"}
                className="flex-1 py-2 bg-red-500 text-white rounded-lg text-xs font-semibold hover:bg-red-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                Reject
              </button>
              <button
                onClick={() => onAction(order._id, "feedback")}
                className="flex-1 py-2 bg-blue-500 text-white rounded-lg text-xs font-semibold hover:bg-blue-600 transition-colors"
              >
               Note
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
