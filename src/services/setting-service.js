import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://158.247.197.212:9090",
  // baseURL: "/api",
  withCredentials: true,
});

export default {
  getUserInfo: function () {
    return new Promise((resolve) => {
      apiClient
        .get("/api/user/info")
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          if (error.response) {
            resolve(error.response.data);
          }
        });
    });
  },
  putUserInfo: function (body) {
    return new Promise((resolve) => {
      apiClient
        .put("/api/user/modify", body)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          if (error.response) {
            resolve(error.response.data);
          }
        });
    });
  },
  getUserId: function () {
    return new Promise((resolve) => {
      apiClient
        .get("/api/user/id")
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          resolve(error.response.data);
        });
    });
  },
};
