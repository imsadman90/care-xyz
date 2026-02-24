"use client"
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function SuccessPage() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const updateOrderStatus = async () => {
      const sessionId = searchParams.get("session_id");
      if (!sessionId) return;
      // Find the order by stripeSessionId
      const res = await fetch(`/api/orders?stripeSessionId=${sessionId}`);
      const orders = await res.json();
      if (orders && orders.length > 0) {
        const orderId = orders[0]._id;
        await fetch(`/api/orders/${orderId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "paid" }),
        });
      }
    };
    updateOrderStatus();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f7fafd]">
      <div className="bg-white p-8 rounded-xl shadow text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4">
          Payment Successful!
        </h1>
        <p className="mb-2">
          Thank you for your booking. Your payment was processed successfully.
        </p>
        <p className="mb-4">A confirmation email has been sent to you.</p>
        <a href="/" className="btn bg-blue-600 text-white mt-4">
          Go to HOME
        </a>
      </div>
    </div>
  );
}
