import axios from "axios";
import client from "./client";

export async function fetchProducts({ type, categoryId, limit }) {
  let url = "http://localhost:8080/api/products";
  const params = {};

  if (limit) {
    params.limit = limit;
  }

  if (type === "featured") {
    params.type = "featured";
  } else if (categoryId) { // Nếu có categoryId, sử dụng endpoint dành riêng cho danh mục
    url = `http://localhost:8080/api/categories/${categoryId}/products`;
  }
  const response = await axios.get(url, { params });
  return response.data;
}

export const fetchProduct = async (id) => {
  const response = await axios.get(`http://localhost:8080/api/products/${id}`);
  return response.data;
};

export const fetchAllProducts = async () => {
  const response = await axios.get("http://localhost:8080/api/products");
  return response.data;
}

export const createProductApi = async (payload) => {
  const res = await axios.post(`http://localhost:8080/api/products`, payload);
  return res.data;
};

export const updateProductApi = async (id, payload) => {
  console.log(payload);
  const res = await axios.patch(`http://localhost:8082/api/products/${id}`, payload);
  return res.data;
};

export const deleteProductApi = async (id) => {
  const res = await client.delete(`/products/${id}`);
  return res.data;
};

export const reduceStockApi = async (productId, stockQuantity) => {
  const res = await axios.patch(`http://localhost:8082/api/products/${productId}`, { stockQuantity}, {
    headers: {
      'Content-Type': 'application/json'
    },
  });
  console.log(res);
  return res.data;
};
