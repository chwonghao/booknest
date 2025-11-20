import client from "./client";

export const createPaymentApi = async (payload) => {
  const res = await client.post("/payments", payload);
  return res.data; // {paymentId, status}
};

export const getPaymentsAdminApi = async (params = {}) => {
  const res = await client.get("/admin/payments", { params });
  return res.data;
};
