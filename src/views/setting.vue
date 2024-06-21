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
          <profile></profile>
        </v-main>
        <!-- 보안 설정 -->
        <v-main v-show="showSecurity">
          <security></security>
        </v-main>
      </v-col>
    </v-row>
  </v-app>
</template>
<style scoped></style>
<script>
import profile from "@/components/setting/profile.vue";
import security from "@/components/setting/security.vue";

export default {
  name: "setting",
  components: {
    profile,
    security,
  },
  data: function () {
    return {
      showProfile: true,
      showSecurity: false,
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
