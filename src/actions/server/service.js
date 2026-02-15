"use server";

import { collections, dbConnect } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export const getServices = async () => {
  const services = await dbConnect(collections.SERVICES).find().toArray();
  // Convert _id to string for all services
  return services.map((service) => ({
    ...service,
    _id: service._id?.toString?.() || service._id,
  }));
};

export const getSingleService = async (id) => {
  if (id.length != 24) {
    return {};
  }
  const query = { _id: new ObjectId(id) };

  const service = await dbConnect(collections.SERVICES).findOne(query);

  return { ...service, _id: service._id.toString() } || {};
};
