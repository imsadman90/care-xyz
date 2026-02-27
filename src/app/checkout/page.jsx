import { getCart } from "@/actions/server/cart";
import CheckOut from "@/components/home/CheckOut";
import React from "react";
import { TbHorseToy } from "react-icons/tb";
import Link from "next/link";

const checkOutPage = async () => {
  const cartItems = await getCart();
  const formattedItems = cartItems.map((item) => ({
    ...item,
    _id: item._id?.toString(),
    serviceId: item.serviceId?.toString(), // Convert ObjectId to string
  }));

  return (
    <div>
      {/* title  */}
      <div className="mt-20">
        <h2 className="text-4xl py-4 font-bold border-l-8 border-blue-500 pl-8">
          Check Out Page
        </h2>
      </div>
      {cartItems.length == 0 ? (
        <>
          <div className="text-center py-20 space-y-5">
            <h2 className="text-4xl font-bold">
              You haven't select any service yet
            </h2>
            <Link
              href={"/services"}
              className="btn bg-blue-50 border-2 border-blue-400 btn-lg rounded-full"
            >
              See Services
            </Link>
          </div>
        </>
      ) : (
        <CheckOut cartItems={formattedItems}></CheckOut>
      )}
    </div>
  );
};

export default checkOutPage;
