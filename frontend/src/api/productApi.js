import client from "./client";

export const fetchProducts = async (params = {}) => {
  const res = await client.get("/products", { params });
  return res.data;
};

export const fetchProduct = async (id) => {
  const res = await client.get(`/products/${id}`);
  return res.data;
};
