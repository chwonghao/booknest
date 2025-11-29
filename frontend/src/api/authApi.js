import axios from "axios";

export const loginApi = async (payload) => {
  try {
    const res = await axios.post("http://localhost:8081/api/auth/login", payload);
    return res.data;
  } catch (error) {
    console.error("Error in loginApi:", error);
    throw error;
  }
};

export const registerApi = async (payload) => {
  const res = await axios.post("http://localhost:8081/api/users", payload);
  return res.data;
};

export const profileApi = async (params) => {
  const token = localStorage.getItem("authToken");
  const url = `http://localhost:8081/api/users/search?email=${params.email}`;
  const res = await axios.get(url, {headers: {Authorization: `Bearer ${token}`}});
  return res.data;
};

export const updateProfileApi = async (userId, payload) => {
  const token = localStorage.getItem("authToken");
  const url = `http://localhost:8081/api/users/${userId}`;
  const res = await axios.patch(url, payload, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
