import client from "./client";

export const createOrderApi = async (payload) => {
  const res = await client.post("/orders", payload);
  return res.data; // {orderId, status, ...}
};

export const getMyOrdersApi = async (params = {}) => {
  const res = await client.get("/orders/my", { params });
  return res.data;
};
