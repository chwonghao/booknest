import axios from "axios";
import client from "./client";

export async function fetchCategories() {
  try {
    const response = await axios.get("http://localhost:8080/api/categories");
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    // Trả về mảng rỗng hoặc throw lỗi tùy theo cách bạn muốn xử lý ở component
    return []; 
  }
}

// Lấy category theo id
export async function fetchCategoryById(id) {
  try {
    const response = await axios.get(`http://localhost:8080/api/categories/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching category ${id}:`, error);
    // Trả về null hoặc throw lỗi
    return null;
  }
}

// Lấy products theo category id
export async function fetchProductsByCategory(id) {
  try {
    const response = await axios.get(`http://localhost:8080/api/categories/${id}/products`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching products for category ${id}:`, error);
    return [];
  }
}
