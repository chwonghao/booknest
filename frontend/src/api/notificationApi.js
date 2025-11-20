import client from "./client";

export const getNotificationsApi = async () => {
  const res = await client.get("/notifications");
  return res.data;
};

export const markAllReadApi = async () => {
  const res = await client.post("/notifications/read-all");
  return res.data;
};
