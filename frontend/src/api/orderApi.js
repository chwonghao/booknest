import axios from "axios";

export const createOrderApi = async (payload) => {
  const token = localStorage.getItem("authToken");
  const url = `http://localhost:8083/api/orders`;
  const res = await axios.post(url, payload, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
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
