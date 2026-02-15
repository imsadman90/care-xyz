"use server";

import { authOptions } from "@/lib/authOptions";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { cache } from "react";

const { dbConnect, collections } = require("@/lib/dbConnect");

const cartCollection = dbConnect(collections.CART);

export const handleCart = async (serviceId) => {
  const { user } = (await getServerSession(authOptions)) || {};
  if (!user) return { success: false };

  //getCartItem->user.email && serviceId
  const query = { email: user?.email, serviceId: new ObjectId(serviceId) };

  const isAdded = await cartCollection.findOne(query);

  if (isAdded) {
    //if Exist:Update Cart

    const updatedData = {
      $inc: {
        quantity: 1,
      },
    };

    const result = await cartCollection.updateOne(query, updatedData);
    return { success: Boolean(result.modifiedCount) };
  } else {
    const service = await dbConnect(collections.SERVICES).findOne({
      _id: new ObjectId(serviceId),
    });
    //Not Exist:insert Cart
    const newData = {
      serviceId: service?._id,
      email: user?.email,
      title: service.title,
      quantity: 1,
      image: service.image,
      price: service.price - (service.price * service.discount) / 100,
      username: user?.name,
    };

    const result = await cartCollection.insertOne(newData);
    return { success: result.acknowledged };
  }
};

export const getCart = cache(async () => {
  const { user } = (await getServerSession(authOptions)) || {};
  if (!user) return [];
  console.log("get cart called");

  const query = { email: user?.email };

  const result = await cartCollection.find(query).toArray();

  return result;
});

export const deleteItemsFromCart = async (id) => {
  const { user } = (await getServerSession(authOptions)) || {};
  if (!user) return { success: false };

  if (id?.length != 24) {
    return { success: false };
  }

  const query = { _id: new ObjectId(id), email: user?.email };

  const result = await cartCollection.deleteOne(query);

  //   if (Boolean(result.deletedCount)) {
  //     revalidatePath("/cart");
  //   }

  return { success: Boolean(result.deletedCount) };
};

export const increaseItemDb = async (id, quantity) => {
  const { user } = (await getServerSession(authOptions)) || {};
  if (!user) return { success: false };

  if (quantity > 10) {
    return { success: false, message: "You cant buy 10 service at a time" };
  }

  const query = { _id: new ObjectId(id), email: user?.email };

  const updatedData = {
    $inc: {
      quantity: 1,
    },
  };

  const result = await cartCollection.updateOne(query, updatedData);

  return { success: Boolean(result.modifiedCount) };
};

export const decreaseItemDb = async (id, quantity) => {
  const { user } = (await getServerSession(authOptions)) || {};
  if (!user) return { success: false };

  if (quantity <= 1) {
    return { success: false, message: "quantity cant be empty" };
  }

  const query = { _id: new ObjectId(id), email: user?.email };

  const updatedData = {
    $inc: {
      quantity: -1,
    },
  };

  const result = await cartCollection.updateOne(query, updatedData);

  return { success: Boolean(result.modifiedCount) };
};

export const clearCart = async () => {
  const { user } = (await getServerSession(authOptions)) || {};
  if (!user) return { success: false };
  const query = { email: user?.email };
  const result = await cartCollection.deleteMany(query);
  return result;
};
