<template>
  <v-container>
    <v-row>
      <v-col>
        <h3>프로필 설정</h3>
        <h5>
          프로필을 변경 할 수 있습니다. 변경된 프로필은 다른 사람에게 보이는
          정보 입니다.
        </h5>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="10">
        <h4>프로필 사진</h4>
        <div class="img"></div>
      </v-col>
      <v-col class="text-right" cols="2">
        <v-dialog max-width="500" persistent>
          <template v-slot:activator="{ props: activatorProps }">
            <v-btn
              v-bind="activatorProps"
              color="surface-variant"
              text="수정하기"
              variant="flat"
              @click="putData"
            ></v-btn>
          </template>

          <template v-slot:default="{ isActive }">
            <v-card title="프로필 수정">
              <v-text-field
                v-model="modifyUsername"
                label="이름"
                variant="solo"
              ></v-text-field>
              <v-text-field
                v-model="modifyPosition"
                label="직무"
                variant="solo"
              ></v-text-field>
              <v-text-field
                v-model="modifyIntroduction"
                label="상태 메세지"
                variant="solo"
              ></v-text-field>
              <v-text-field label="개인 이메일" variant="solo"></v-text-field>
              <!-- <v-card-text>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua.
                      </v-card-text> -->
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="isActive.value = false"> 취소 </v-btn>
                <v-btn @click="modify"> 저장 </v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>

        <!-- <v-btn >수정하기</v-btn> -->
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card class="info-card">
          <v-row>
            <v-col cols="2">
              <v-card-text class="info-title"> 이름[닉네임] </v-card-text>
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
              <v-card-text class="info-title"> 연락처 이메일 </v-card-text>
            </v-col>
            <v-col cols="10">
              <div class="vertical-line info-title"></div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
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
  name: "profile",
  created() {
    setting
      .getUserInfo()
      .then((result) => {
        console.log("result: ", result);
        if (result.result) {
          this.username = result.value.username;
          this.position = result.value.position;
          this.introduction = result.value.introduction;
        } else {
          alert("로그인 만료됨");
          window.location.href = "https://www.sync-team.co.kr/";
          //   window.location.href = "https://localhost/";
        }
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  },
  data: function () {
    return {
      username: null,
      position: null,
      introduction: null,
      modifyUsername: null,
      modifyPosition: null,
      modifyIntroduction: null,
    };
  },
  methods: {
    putData: function () {
      this.modifyUsername = this.username;
      this.modifyPosition = this.position;
      this.modifyIntroduction = this.introduction;
    },
    modify: function () {
      const body = {
        username: this.modifyUsername,
        position: this.modifyPosition,
        introduction: this.modifyIntroduction,
      };

      setting
        .putUserInfo(body)
        .then((result) => {
          if (result.result) {
            alert(result.message);
            window.location.reload();
          } else {
            alert("수정 안됐소");
          }
        })
        .catch((error) => {
          console.error("Error: ", error);
        });
    },
  },
};
</script>
