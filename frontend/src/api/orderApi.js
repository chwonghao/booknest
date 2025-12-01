import axios from "axios";
import { fetchProduct, reduceStockApi } from "./productApi";

export const createOrderApi = async (payload) => {
  const data = payload;
  const orderItems = payload.orderItems;
  try {
    for (const item of orderItems) {
      const product = await fetchProduct(item.productId);
      await reduceStockApi(item.productId, product.stockQuantity - item.quantity);
    }
  } catch (error) {
    console.error(error);
  }
  const token = localStorage.getItem("authToken");
  const url = `http://localhost:8083/api/orders`;
  const res = await axios.post(url, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    }
  });
  return res;
};

export const getMyOrdersApi = async (userId, params = {}) => {
  const token = localStorage.getItem("authToken");
  const url = `http://localhost:8083/api/orders/user/${userId}`;
  const res = await axios.get(url, {
    params,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const getAllOrdersApi = async () => {
  const token = localStorage.getItem("authToken");
  const url = `http://localhost:8083/api/orders`;
  const res = await axios.get(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const updateOrderStatusApi = async (orderId, status) => {
  try {
    const token = localStorage.getItem("authToken");
    const url = `http://localhost:8083/api/orders/${orderId}`;
    const response = await axios.patch(url, { status }, {
      headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating order status for order ${orderId}:`, error.response || error);
    throw error.response?.data || new Error('Failed to update order status');
  }
};