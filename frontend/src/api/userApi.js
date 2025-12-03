import api from "./authApi"; // Sử dụng lại instance axios đã có interceptor

export const getAllUserApi = async () => {
  // Interceptor sẽ tự động đính kèm token
  const res = await api.get(`/users`);
  return res.data;
};

export const updateUserApi = async (userId, payload) => {
  // Interceptor sẽ tự động đính kèm token
  const res = await api.patch(`/users/${userId}`, payload);
  return res.data;
};