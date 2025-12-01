import axios from "axios";

export const getAllUserApi = async () => {
    const token = localStorage.getItem("authToken");
    const url = `http://localhost:8081/api/users`;
    const res = await axios.get(url, {
        headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
};