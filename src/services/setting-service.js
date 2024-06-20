import axios from "axios";

const apiClient = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

export default {
  getUserInfo: function () {
    return new Promise((resolve) => {
      apiClient.get("/api/user/info").then((response) => {
        resolve(response.data);
      });
    });
  },
};
