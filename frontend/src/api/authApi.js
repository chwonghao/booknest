import client from "./client";

export const loginApi = async (payload) => {
  const res = await client.post("/auth/login", payload);
  return res.data; // {token, name, role}
};

export const registerApi = async (payload) => {
  const res = await client.post("/auth/register", payload);
  return res.data;
};

export const profileApi = async () => {
  const res = await client.get("/users/me");
  return res.data;
};

export const updateProfileApi = async (payload) => {
  const res = await client.put("/users/me", payload);
  return res.data;
};
