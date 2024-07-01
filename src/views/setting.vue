<template>
  <v-app>
    <v-row>
      <v-col>
        <v-navigation-drawer permanent>
          <v-list-item
            :style="focusProfile"
            link
            title="프로필 설정"
            @click="profile"
          ></v-list-item>
          <v-divider></v-divider>
          <v-list-item
            :style="focusSecurity"
            link
            title="보안 설정"
            @click="security"
          ></v-list-item>
          <v-divider></v-divider>
        </v-navigation-drawer>
        <!-- 프로필 설정 -->
        <v-main v-show="showProfile">
          <account
            :userId="userId"
            :profileImg="profileImg"
            :username="username"
            :nickname="nickname"
            :position="position"
            :introduction="introduction"
          ></account>
        </v-main>
        <!-- 보안 설정 -->
        <v-main v-show="showSecurity">
          <alarm></alarm>
        </v-main>
      </v-col>
    </v-row>
  </v-app>
</template>
<style scoped></style>
<script>
import setting from "@/services/setting-service";
import account from "@/components/setting/account.vue";
import alarm from "@/components/setting/alarm.vue";

export default {
  name: "setting",
  components: {
    account,
    alarm,
  },
  created() {
    setting
      .getUserInfo()
      .then((result) => {
        if (result.result) {
          this.userId = result.value.userId;
          this.profileImg = result.value.profileImg;
          this.username = result.value.username;
          this.nickname = result.value.nickname;
          this.position = result.value.position;
          this.introduction = result.value.introduction;
        } else {
          alert("로그인 만료됨");
          window.location.href = "https://www.sync-team.co.kr/";
          // window.location.href = "https://localhost/";
        }
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  },
  data: function () {
    return {
      showProfile: true,
      showSecurity: false,
      userId: null,
      profileImg: null,
      username: null,
      nickname: null,
      position: null,
      introduction: null,
    };
  },
  computed: {
    focusProfile() {
      return this.showProfile ? { backgroundColor: "lightgray" } : {};
    },
    focusSecurity() {
      return this.showSecurity ? { backgroundColor: "lightgray" } : {};
    },
  },
  methods: {
    profile: function () {
      this.showProfile = true;
      this.showSecurity = false;
    },
    security: function () {
      this.showSecurity = true;
      this.showProfile = false;
    },
  },
};
</script>
