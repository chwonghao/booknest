import axios from "axios";
import client from "./client";

export async function fetchProducts({ type, categoryId }) {
  let url = "http://localhost:8080/api/products";
  const params = {};

  if (type === "featured") {
    params.type = "featured";
  } else if (type === "category" && categoryId) {
    // Endpoint này nên được xử lý bởi categoryApi, nhưng vẫn có thể giữ ở đây
    url = `http://localhost:8080/api/categories/${categoryId}/products`;
  }

  // Sử dụng axios client, nó sẽ tự động xử lý baseURL và lỗi
  const response = await axios.get(url, { params });
  return response.data;
}

export const fetchProduct = async (id) => {
  // Sử dụng axios client
  const response = await axios.get(`http://localhost:8080/api/products/${id}`);
  return response.data;
};
