import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:8080/api",
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem("authToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        const res = await axios.post(
          "http://localhost:8080/api/auth/refresh",
          { refreshToken }
        );

        const newToken = res.data.token;
        localStorage.setItem("authToken", newToken);

        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem("authToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;

export const loginApi = async payload => {
  const res = await api.post("/auth/login", payload);
  return res.data;
};

export const registerApi = async payload => {
  const res = await api.post("/users", payload);
  return res.data;
};

export const profileApi = async (userEmail, token) => {
  const res = await axios.get(`http://localhost:8080/api/users/search?email=${userEmail}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const updateProfileApi = async (userId, payload) => {
  const res = await api.patch(`/users/${userId}`, payload);
  return res.data;
};
