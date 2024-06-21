<template>
  <v-container>
    <v-row>
      <v-col>
        <h3>보안 설정</h3>
        <h5>사용자의 정보를 설정 할 수 있습니다.</h5>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card class="info-card">
          <v-row>
            <v-col cols="2">
              <v-card-text class="info-title pa-4"> 아이디 </v-card-text>
            </v-col>
            <v-col cols="10">
              <div class="vertical-line info-content d-flex align-center">
                {{ id }}
              </div>
            </v-col>
          </v-row>
        </v-card>

        <v-card class="info-card">
          <v-row class="pa-4">
            <v-col cols="10">
              <v-card-text class="info-title"> 비밀번호 </v-card-text>
            </v-col>
            <v-col cols="2" class="d-flex align-center justify-end">
              <v-dialog max-width="500" persistent>
                <template v-slot:activator="{ props: activatorProps }">
                  <v-btn
                    v-bind="activatorProps"
                    color="surface-variant"
                    text="비밀번호 변경"
                    variant="flat"
                    @click="putData"
                    size="small"
                  ></v-btn>
                </template>

                <template v-slot:default="{ isActive }">
                  <v-card title="비밀번호 변경">
                    <v-card-text>
                      특수 문자를 포함한 최소 n글자 이상 입력 해 주세요.
                    </v-card-text>
                    <v-text-field
                      v-model="currentPwd"
                      label="현재 비밀번호"
                      variant="solo"
                      type="password"
                    ></v-text-field>
                    <v-text-field
                      v-model="newPwd"
                      label="새 비밀번호"
                      variant="solo"
                      type="password"
                    ></v-text-field>
                    <v-text-field
                      v-model="checkNewPwd"
                      label="새 비밀번호 확인"
                      variant="solo"
                      type="password"
                    ></v-text-field>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn @click="isActive.value = false"> 취소 </v-btn>
                      <v-btn @click="modify"> 저장 </v-btn>
                    </v-card-actions>
                  </v-card>
                </template>
              </v-dialog>
              <!-- <v-btn size="small">비밀번호 변경</v-btn> -->
            </v-col>
          </v-row>
        </v-card>

        <v-card class="info-card">
          <v-row class="pa-4">
            <v-col cols="10">
              <v-card-text class="info-title"> 계정 삭제 </v-card-text>
            </v-col>
            <v-col cols="2" class="d-flex align-center justify-end">
              <v-btn size="small">계정 삭제하기</v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<style scoped>
.info-card {
  width: 100%;
  margin-top: 12px;
  border: 1px solid #ccc;
  border-radius: 10px;
}
.info-title {
  padding: 0;
  font-size: 13px;
  display: flex;
  align-items: flex-end;
}
.info-content {
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
    setting.getUserId().then((result) => {
      if (result.result) {
        this.id = result.value;
      } else {
        alert("로그인 만료됨");
        window.location.href = "https://www.sync-team.co.kr/";
        // window.location.href = "https://localhost/";
      }
    });
  },
  data: function () {
    return {
      id: null,
      currentPwd: null,
      newPwd: null,
      checkNewPwd: null,
    };
  },
  methods: {
    putData: function () {
      this.currentPwd = null;
      this.newPwd = null;
      this.checkNewPwd = null;
    },
    modify: function () {
      console.log("암것도 없음 ㅎ");
    },
  },
};
</script>
