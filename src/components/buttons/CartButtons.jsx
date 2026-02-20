"use client";
import { handleCart } from "@/actions/server/cart";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaCartPlus } from "react-icons/fa";
import Swal from "sweetalert2";

const CartButton = ({ service }) => {
  const session = useSession();
  const path = usePathname();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const islogin = session?.status == "authenticated";

  const handleAdd2Cart = async () => {
    setIsLoading(true);
    if (islogin) {
      const result = await handleCart(service._id);
      if (result.success) {
        Swal.fire({
          title: "Added to Cart",
          text: `${service.title} Service Booked`,
          icon: "success",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          cancelButtonText: "Want to buy more",
          confirmButtonText: "Go to Checkout",
        }).then((res) => {
          if (res.isConfirmed) router.push("/checkout");
        });
        // Swal.fire("Service Booked", service?.title, "success");
      } else {
        Swal.fire("Opps", "Something Wrong Happen", "error");
      }
      setIsLoading(false);
    } else {
      router.push(`/login?callbackUrl=${path}`);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button
        disabled={session.status == "loading" || isLoading}
        onClick={handleAdd2Cart}
        className="btn bg-blue-600 text-white w-full flex gap-2 rounded-full"
      >
        <FaCartPlus />
        Book this Service
      </button>
    </div>
  );
};

export default CartButton;
