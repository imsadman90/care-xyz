"use client";
import { useState, useEffect } from "react";

export default function AdminDashboardPage() {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [view, setView] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    fetch("/api/admin-orders")
      .then((res) => res.json())
      .then((data) => setOrders(Array.isArray(data) ? data : []));
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(Array.isArray(data) ? data : []));
  }, []);

  const revenue = orders
    .filter((o) => o.status === "paid")
    .reduce((sum, o) => sum + (o.totalPrice || 0), 0);
  const bookings = orders.length;
  const pending = orders.filter(
    (o) => o.status === "unpaid" || o.status === "pending",
  ).length;
  const completed = orders.filter((o) => o.status === "paid").length;

  const stats = [
    {
      label: "Total Revenue",
      value: `$${revenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
      badge: "↑ 12%",
      badgeColor: "text-emerald-600",
      bg: "bg-blue-50",
    },
    {
      label: "Total Bookings",
      value: bookings.toLocaleString(),
      badge: "↑ 5%",
      badgeColor: "text-emerald-600",
      bg: "bg-violet-50",
    },
    {
      label: "Pending",
      value: pending,
      badge: "↓ 2%",
      badgeColor: "text-red-500",
      bg: "bg-amber-50",
    },
    {
      label: "Completed",
      value: completed,
      badge: "↑ 8%",
      badgeColor: "text-emerald-600",
      bg: "bg-emerald-50",
    },
  ];

  const navItems = [
    { id: "dashboard", label: "Dashboard", count: null },
    { id: "bookings", label: "All Bookings", count: orders.length },
    { id: "users", label: "Users", count: users.length },
  ];

  const handleNav = (id) => {
    setView(id);
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans mt-14">
      {/* Mobile top bar */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200 sticky top-0 z-30">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Toggle menu"
        >
          <div className="flex flex-col gap-1.5 w-5">
            <span
              className={`block h-0.5 bg-gray-700 transition-all ${sidebarOpen ? "rotate-45 translate-y-2" : ""}`}
            />
            <span
              className={`block h-0.5 bg-gray-700 transition-all ${sidebarOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-0.5 bg-gray-700 transition-all ${sidebarOpen ? "-rotate-45 -translate-y-2" : ""}`}
            />
          </div>
        </button>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/40 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`
            fixed md:sticky top-0 left-0 z-50 md:z-auto
            w-64 bg-white border-r border-gray-200 min-h-screen
            flex flex-col justify-between p-6
            transition-transform duration-300 ease-in-out
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
            md:translate-x-0
          `}
        >
          <div>
            {/* Nav */}
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-3 px-1">
              Main Menu
            </p>
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNav(item.id)}
                  className={`flex items-center justify-between w-full px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    view === item.id
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <span>{item.icon}</span>
                    {item.label}
                  </span>
                  {item.count !== null && (
                    <span
                      className={`text-xs font-bold rounded-full px-2 py-0.5 ${
                        view === item.id
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {item.count}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>

          {/* Footer badge */}
          <div className="mt-6 px-3 py-3 bg-gray-50 rounded-xl border border-gray-200">
            <p className="text-xs text-gray-500 font-medium">Admin Panel</p>
            <p className="text-xs text-gray-400 mt-0.5">Care.xyz v1.0</p>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-10">
          {/* Dashboard View */}
          {view === "dashboard" && (
            <>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8">
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                    Dashboard Overview
                  </h1>
                  <p className="text-sm text-gray-400 mt-0.5">
                    Welcome back, Admin
                  </p>
                </div>
                <input
                  type="text"
                  className="border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 w-full sm:w-auto"
                  placeholder="Oct 1 – Oct 31, 2023"
                />
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {stats.map((s) => (
                  <div
                    key={s.label}
                    className={`${s.bg} rounded-2xl p-5 flex flex-col gap-1 border border-gray-100 shadow-sm`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500 font-semibold">
                        {s.label}
                      </span>
                      <span className="text-lg">{s.icon}</span>
                    </div>
                    <span className="text-2xl font-bold text-gray-900 mt-1">
                      {s.value}
                    </span>
                    <span className={`text-xs font-semibold ${s.badgeColor}`}>
                      {s.badge} vs last month
                    </span>
                  </div>
                ))}
              </div>

              {/* Recent Orders Table snippet */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                  <h2 className="font-bold text-gray-900">Recent Bookings</h2>
                  <button
                    onClick={() => setView("bookings")}
                    className="text-xs text-sky-600 font-semibold hover:underline"
                  >
                    View all →
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                          Customer
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {orders.slice(0, 5).map((order) => (
                        <tr
                          key={order._id?.toString()}
                          className="hover:bg-gray-50"
                        >
                          <td className="px-6 py-3 font-medium text-gray-800">
                            {order.customerEmail || "Unknown"}
                          </td>
                          <td className="px-6 py-3">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize
                              ${order.status === "paid" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : ""}
                              ${order.status === "pending" || order.status === "unpaid" ? "bg-amber-50 text-amber-700 border border-amber-200" : ""}
                            `}
                            >
                              {order.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                      {orders.length === 0 && (
                        <tr>
                          <td
                            colSpan={2}
                            className="px-6 py-8 text-center text-gray-400 text-sm"
                          >
                            No recent bookings
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* Bookings View */}
          {view === "bookings" && (
            <div>
              <div className="mb-6">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                  All Bookings
                </h1>
                <p className="text-sm text-gray-400 mt-0.5">
                  {orders.length} total orders
                </p>
              </div>
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  {/* Desktop Table */}
                  <table className="hidden md:table min-w-full text-sm">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        {["Customer", "Status"].map((h) => (
                          <th
                            key={h}
                            className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider"
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {orders.map((order) => (
                        <tr
                          key={order._id?.toString()}
                          className="hover:bg-gray-50"
                        >
                          <td className="px-6 py-3 font-medium text-gray-800">
                            {order.customerEmail || "Unknown"}
                          </td>
                          <td className="px-6 py-3">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize
                              ${order.status === "paid" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-amber-50 text-amber-700 border border-amber-200"}
                            `}
                            >
                              {order.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {/* Mobile Cards */}
                  <div className="md:hidden divide-y divide-gray-100">
                    {orders.map((order) => (
                      <div
                        key={order._id?.toString()}
                        className="flex items-center justify-between px-5 py-4"
                      >
                        <span className="font-medium text-gray-800 text-sm">
                          {order.customerEmail || "Unknown"}
                        </span>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize
                          ${order.status === "paid" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-amber-50 text-amber-700 border border-amber-200"}
                        `}
                        >
                          {order.status}
                        </span>
                      </div>
                    ))}
                    {orders.length === 0 && (
                      <p className="px-5 py-10 text-center text-gray-400 text-sm">
                        No bookings found
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Users View */}
          {view === "users" && (
            <div>
              <div className="mb-6">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                  Users
                </h1>
                <p className="text-sm text-gray-400 mt-0.5">
                  {users.length} registered users
                </p>
              </div>
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="divide-y divide-gray-100">
                  {users.map((user) => (
                    <div
                      key={user._id?.toString()}
                      className="flex items-center gap-3 px-5 py-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-sky-700 font-bold text-sm flex-shrink-0">
                        {(user.name || user.email || "?")[0].toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-gray-800 text-sm truncate">
                          {user.name || user.email || "Unknown"}
                        </p>
                        {user.name && user.email && (
                          <p className="text-xs text-gray-400 truncate">
                            {user.email}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                  {users.length === 0 && (
                    <p className="px-5 py-10 text-center text-gray-400 text-sm">
                      No users found
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
