import { getCart } from "@/actions/server/cart";
import Cart from "@/components/home/Cart";
import { TbHorseToy } from "react-icons/tb";
import React from "react";
import Link from "next/link";

const CartPage = async () => {
  const cartItems = await getCart();
  console.log(cartItems);

  const formattedItems = cartItems.map((item) => ({
    ...item,
    _id: item._id.toString(),
  }));

  return (
    <div>
      {/* title  */}
      <div className="mt-10">
        <h2 className="text-4xl py-4 font-bold">My Cart</h2>
      </div>
      {cartItems.length == 0 ? (
        <>
          <div className="text-center py-20 space-y-5">
            <h2 className="text-4xl font-bold">
              You haven't added any service to the cart
            </h2>
            <Link
              href={"/services"}
              className="btn border-purple-500 bg-purple-100 btn-lg btn-wide"
            >
              <TbHorseToy></TbHorseToy> পন্য দেখুন
            </Link>
          </div>
        </>
      ) : (
        <Cart cartItem={JSON.parse(JSON.stringify(formattedItems))}></Cart>
      )}
    </div>
  );
};

export default CartPage;
