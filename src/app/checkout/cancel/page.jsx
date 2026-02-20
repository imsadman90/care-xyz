export default function CancelPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f7fafd]">
      <div className="bg-white p-8 rounded-xl shadow text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">
          Payment Cancelled
        </h1>
        <p className="mb-2">
          Your payment was not completed. You can try again or contact support
          if you need help.
        </p>
        <a href="/checkout" className="btn bg-blue-600 text-white mt-4">
          Back to Checkout
        </a>
      </div>
    </div>
  );
}
