import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/authOptions";
import { dbConnect, collections } from "@/lib/dbConnect";
import { FiMoreVertical } from "react-icons/fi";

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") {
    redirect("/");
  }

  // Fetch all orders for stats and payments
  const orderCollection = dbConnect(collections.ORDER);
  const orders = await orderCollection
    .find({})
    .sort({ createdAt: -1 })
    .toArray();

  // Stats
  const revenue = orders
    .filter((o) => o.status === "paid")
    .reduce((sum, o) => sum + (o.totalPrice || 0), 0);
  const bookings = orders.length;
  const pending = orders.filter(
    (o) => o.status === "unpaid" || o.status === "pending",
  ).length;
  const completed = orders.filter((o) => o.status === "paid").length;
  // Growth and platformGrowth are placeholders for now
  const stats = {
    revenue,
    bookings,
    pending,
    completed,
    growth: 8,
    revenueGrowth: 12,
    bookingGrowth: 5,
    pendingGrowth: -2,
    platformGrowth: 85,
  };

  // Recent payments (last 4 orders)
  const payments = orders.slice(0, 4).map((o, i) => ({
    id: o._id?.toString() || `TRX-${i}`,
    name: o.customerName || o.customerEmail || "Unknown",
    service: o.items?.[0]?.title || "Service",
    amount: o.totalPrice || 0,
    status:
      o.status === "paid"
        ? "Success"
        : o.status === "unpaid"
          ? "Pending"
          : o.status,
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r-2 border-gray-200  min-h-screen p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-8">
              <div className="bg-blue-100 rounded-full p-2">
                <span className="text-blue-600 font-bold text-xl">🛡️</span>
              </div>
              <span className="font-bold text-lg">Care.xyz</span>
            </div>
            <nav className="flex flex-col gap-2">
              <a
                className="bg-blue-50 text-blue-700 rounded px-4 py-2 font-semibold"
                href="#"
              >
                Dashboard
              </a>
              <a className="hover:bg-gray-100 rounded px-4 py-2" href="#">
                All Bookings
              </a>
              <a className="hover:bg-gray-100 rounded px-4 py-2" href="#">
                Payment History
              </a>
              <a className="hover:bg-gray-100 rounded px-4 py-2" href="#">
                Users
              </a>
            </nav>
          </div>
        </aside>
        {/* Main Content */}
        <main className="flex-1 p-10">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold">Dashboard Overview</h1>
            <input
              type="text"
              className="border rounded px-3 py-1 text-sm"
              placeholder="Oct 1, 2023 - Oct 31, 2023"
            />
          </div>
          {/* Stats */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow flex flex-col items-center">
              <span className="text-gray-400 text-sm">Total Revenue</span>
              <span className="text-2xl font-bold mt-2">
                $
                {stats.revenue.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                })}
              </span>
              <span className="text-green-500 text-xs mt-1">
                ↑ {stats.revenueGrowth}%
              </span>
            </div>
            <div className="bg-white rounded-xl p-6 shadow flex flex-col items-center">
              <span className="text-gray-400 text-sm">Total Bookings</span>
              <span className="text-2xl font-bold mt-2">
                {stats.bookings.toLocaleString()}
              </span>
              <span className="text-green-500 text-xs mt-1">
                ↑ {stats.bookingGrowth}%
              </span>
            </div>
            <div className="bg-white rounded-xl p-6 shadow flex flex-col items-center">
              <span className="text-gray-400 text-sm">Pending Bookings</span>
              <span className="text-2xl font-bold mt-2">{stats.pending}</span>
              <span className="text-red-500 text-xs mt-1">
                ↓ {Math.abs(stats.pendingGrowth)}%
              </span>
            </div>
            <div className="bg-white rounded-xl p-6 shadow flex flex-col items-center">
              <span className="text-gray-400 text-sm">Completed Bookings</span>
              <span className="text-2xl font-bold mt-2">{stats.completed}</span>
              <span className="text-green-500 text-xs mt-1">
                ↑ {stats.growth}%
              </span>
            </div>
          </div>
          {/* Recent Payment History */}
          <div className="bg-white rounded-xl shadow p-6 mb-8 overflow-x-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-lg">Recent Payment History</h2>
              <a href="#" className="text-blue-600 text-sm font-semibold">
                View All Transactions
              </a>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-gray-400">
                  <th className="py-2 text-left">TRANSACTION ID</th>
                  <th className="py-2 text-left">USER NAME</th>
                  <th className="py-2 text-left">SERVICE</th>
                  <th className="py-2 text-left">AMOUNT</th>
                  <th className="py-2 text-left">STATUS</th>
                  <th className="py-2 text-left">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((p) => (
                  <tr key={p.id} className="border-t">
                    <td className="py-2">{p.id}</td>
                    <td className="py-2 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-gray-200 inline-block" />
                      {p.name}
                    </td>
                    <td className="py-2">{p.service}</td>
                    <td className="py-2 font-semibold">
                      ${p.amount.toLocaleString()}
                    </td>
                    <td className="py-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-bold ${p.status === "Success" ? "bg-green-100 text-green-600" : p.status === "Pending" ? "bg-yellow-100 text-yellow-600" : "bg-red-100 text-red-600"}`}
                      >
                        {p.status}
                      </span>
                    </td>
                    <td className="py-2">
                      <button
                        className="text-gray-400 hover:text-blue-600"
                        title="Actions"
                      >
                        <FiMoreVertical size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}
