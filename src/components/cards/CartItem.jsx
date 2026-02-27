"use client";

import {
  decreaseItemDb,
  deleteItemsFromCart,
  increaseItemDb,
} from "@/actions/server/cart";
import Image from "next/image";
import { useState } from "react";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";

const CartItem = ({ item, removeItem, updateQuantity }) => {
  const { title, image, quantity, price, _id } = item;

  const [loading, setLoading] = useState(false);

  const handleDeleteCart = async () => {
    setLoading(true);
    Swal.fire({
      title: "Are you sure ?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Remove it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const result = await deleteItemsFromCart(_id);

        if (result.success) {
          removeItem(_id);

          Swal.fire({
            title: "Deleted!",
            text: "The Service has been removed.",
            icon: "success",
          });
        } else {
          Swal.fire({
            title: "Opps!",
            text: "Something went wrong.",
            icon: "error",
          });
        }
      }
      setLoading(false);
    });
  };

  const onIncrease = async () => {
    setLoading(true);
    const result = await increaseItemDb(_id, quantity);

    if (result.success) {
      Swal.fire("success", "This service has been added again", "success");
      updateQuantity(_id, quantity + 1);
    }
    setLoading(false);
  };

  const onDecrease = async () => {
    setLoading(true);
    const result = await decreaseItemDb(_id, quantity);
    if (result.success) {
      Swal.fire(
        "success",
        "The Quantity of this service has been reduced",
        "success",
      );
      updateQuantity(_id, quantity - 1);
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center gap-6 p-4 bg-white border border-purple-100 shadow-lg rounded-2xl hover:shadow-xl transition-all">
      {/* Image */}
      <div className="w-20 h-20 relative flex-shrink-0 overflow-hidden rounded-xl border border-purple-50 bg-blue-50">
        <Image
          src={image}
          alt={title}
          fill
          sizes="80px"
          className="object-cover rounded-xl"
          priority={false}
          unoptimized={false}
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-base truncate mb-1 text-purple-900">
          {title}
        </h3>
        <p className="text-xs text-gray-500 mb-2">
          Unit Price:{" "}
          <span className="font-medium text-sky-700">Taka : {price}</span>
        </p>

        {/* Quantity controls */}
        <div className="flex items-center gap-2 mt-1">
          <button
            className="btn btn-xs btn-outline border-purple-300 text-sky-700 hover:bg-blue-100"
            onClick={onDecrease}
            disabled={quantity === 1 || loading}
            aria-label="Decrease quantity"
          >
            <FaMinus />
          </button>

          <span className="px-3 font-semibold text-purple-900 text-base bg-blue-50 rounded">
            {quantity}
          </span>

          <button
            className="btn btn-xs btn-outline border-purple-300 text-sky-700 hover:bg-blue-100"
            disabled={quantity === 10 || loading}
            onClick={onIncrease}
            aria-label="Increase quantity"
          >
            <FaPlus />
          </button>
        </div>
      </div>

      {/* Total + Remove */}
      <div className="text-right space-y-3 min-w-[90px]">
        <p className="font-bold text-lg text-sky-700">
          Taka : {price * quantity}
        </p>

        <button
          onClick={handleDeleteCart}
          className="btn btn-xs bg-red-50 border border-red-200 text-red-600 hover:bg-red-100 transition"
          aria-label="Remove from cart"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
