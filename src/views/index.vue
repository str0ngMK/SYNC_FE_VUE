<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <div>
          <v-btn color="success" @click="showLoginInput">login</v-btn>
          <v-btn @click="showSettingPage">Show Setting Page</v-btn>
        </div>
      </v-col>
    </v-row>
    <v-row class="text-center" v-show="showLogin">
      <v-col cols="12">
        <v-text-field
          v-model="id"
          label="아이디"
          @keyup.enter="handleEnter"
        ></v-text-field>
        <v-text-field
          v-model="pwd"
          label="비밀번호"
          type="password"
          @keyup.enter="handleEnter"
        ></v-text-field>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import jwt from "@/services/jwt-service";

export default {
  name: "index",
  data: function () {
    return {
      showLogin: false,
      isAuth: false,
      id: null,
      pwd: null,
    };
  },
  methods: {
    handleEnter() {
      const id = this.id;
      const pwd = this.pwd;
      if (id !== null && pwd !== null) {
        console.log("id: ", id);
        console.log("pwd: ", pwd);
        this.getAuth(id, pwd);
      } else {
        alert("똑바로 쓰시오");
      }
    },
    showLoginInput() {
      this.showLogin = !this.showLogin;
    },
    getAuth(id, pwd) {
      let params = { id: id, password: pwd };
      jwt
        .login(params)
        .then((result) => {
          console.log("result: ", result);
          if (result.result) {
            alert("성공 했소");
            this.isAuth = true;
          } else {
            alert(result.message);
          }
        })
        .catch((error) => {
          console.error("Error: ", error);
        });
    },
    showSettingPage() {
      jwt.getAuth().then((result) => {
        if (result.result) {
          window.location.href = "https://www.sync-team.co.kr/setting";
          // window.location.href = "https://localhost/setting";
        } else {
          console.log("result", result);
          alert("로그인 하시오");
        }
      });
    },
  },
};
</script>
