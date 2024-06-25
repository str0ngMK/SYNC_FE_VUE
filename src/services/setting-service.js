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
  putUserInfo: function (params) {
    return new Promise((resolve) => {
      apiClient
        .put("/api/user/modify/userInfo", params)
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
  getProject: function () {
    return new Promise((resolve) => {
      apiClient
        .get("/api/user/project/get")
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
  postEmailSend: function (body) {
    return new Promise((resolve) => {
      apiClient
        .post("/api/user/delAcc/email/send", body)
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
  getEmailVerification: function (params) {
    return new Promise((resolve) => {
      apiClient
        .get("/api/user/delAcc/email", { params })
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
