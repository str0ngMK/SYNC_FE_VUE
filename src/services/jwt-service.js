import axios from "axios";

const apiClient = axios.create({
  // baseURL: "https://158.247.197.212:9090",
  baseURL: "/api",
  withCredentials: true,
});

export default {
  login: function (params) {
    return new Promise((resolve) => {
      apiClient
        .post("/login", null, { params })
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
  getAuth: function () {
    return new Promise((resolve) => {
      apiClient
        .get("/api/user/auth")
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
};
