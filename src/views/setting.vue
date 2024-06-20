<template>
  <v-app>
    <v-row>
      <v-col>
        <!-- nav -->
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
          <v-container>
            <v-row>
              <v-col>
                <h3>프로필 설정</h3>
                <h5>
                  프로필을 변경 할 수 있습니다. 변경된 프로필은 다른 사람에게
                  보이는 정보 입니다.
                </h5>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="10">
                <h4>프로필 사진</h4>
                <div class="img"></div>
              </v-col>
              <v-col class="text-right" cols="2">
                <v-btn>수정하기</v-btn>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-card class="info-card">
                  <v-row>
                    <v-col cols="2">
                      <v-card-text class="info-title">
                        이름[닉네임]
                      </v-card-text>
                    </v-col>
                    <v-col cols="10">
                      <div class="vertical-line info-title">{{ username }}</div>
                    </v-col>
                  </v-row>
                </v-card>

                <v-card class="info-card">
                  <v-row>
                    <v-col cols="2">
                      <v-card-text class="info-title"> 직무 </v-card-text>
                    </v-col>
                    <v-col cols="10">
                      <div class="vertical-line info-title">{{ position }}</div>
                    </v-col>
                  </v-row>
                </v-card>

                <v-card class="info-card">
                  <v-row>
                    <v-col cols="2">
                      <v-card-text class="info-title info-title">
                        상태 메세지
                      </v-card-text>
                    </v-col>
                    <v-col cols="10">
                      <div class="vertical-line info-title">
                        {{ introduction }}
                      </div>
                    </v-col>
                  </v-row>
                </v-card>

                <v-card class="info-card">
                  <v-row>
                    <v-col cols="2">
                      <v-card-text class="info-title">
                        연락처 이메일
                      </v-card-text>
                    </v-col>
                    <v-col cols="10">
                      <div class="vertical-line info-title"></div>
                    </v-col>
                  </v-row>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-main>
        <!-- 보안 설정 -->
        <v-main v-show="showSecurity">
          <v-container>
            <v-row>
              <v-col>
                <h3>얘는 보안임</h3>
              </v-col>
            </v-row>
          </v-container>
        </v-main>
      </v-col>
    </v-row>
  </v-app>
</template>
<style scoped>
.img {
  width: 100px;
  height: 100px;
  background-color: lightgray;
  border-radius: 50%;
}
.info-card {
  width: 100%;
  margin-top: 12px;
  border: 1px solid #ccc;
  border-radius: 10px;
}
.info-title {
  padding: 12px;
  font-size: 13px;
}
.vertical-line {
  border-left: 1px solid #ccc;
  height: 100%;
  margin-left: 16px;
}
</style>
<script>
import setting from "@/services/setting-service";

export default {
  name: "setting",
  created() {
    setting
      .getUserInfo()
      .then((result) => {
        const json = JSON.parse(result.message);
        this.username = json.username;
        this.position = json.position;
        this.introduction = json.introduction;
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  },
  data: function () {
    return {
      showProfile: true,
      showSecurity: false,
      username: null,
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
