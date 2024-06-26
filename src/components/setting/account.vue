<template>
  <v-container>
    <v-row>
      <v-col>
        <h3>내 계정</h3>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="d-flex justify-start align-center">
        <div class="img mr-5"></div>
        <v-btn class="mr-5">변경</v-btn>
        <v-btn>삭제</v-btn>
      </v-col>
    </v-row>
    <h3>계정 정보</h3>
    <v-row>
      <v-col cols="11">
        <v-text-field
          label="이메일 주소"
          variant="underlined"
          v-model="model_userId"
          readonly
        >
        </v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="11">
        <v-text-field
          label="이름"
          variant="underlined"
          v-model="model_username"
          readonly
        >
        </v-text-field>
      </v-col>
    </v-row>
    <h3>프로필 정보</h3>
    <v-row>
      <v-col cols="11">
        <v-text-field
          label="닉네임"
          variant="underlined"
          v-model="model_nickname"
        ></v-text-field>
      </v-col>
      <v-col>
        <v-btn @click="modify('N')">변경</v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="11">
        <v-text-field
          label="직무"
          variant="underlined"
          v-model="model_position"
        ></v-text-field>
      </v-col>
      <v-col cols="1">
        <v-btn @click="modify('P')">변경</v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="11">
        <v-text-field
          label="소개"
          variant="underlined"
          v-model="model_introduction"
        ></v-text-field>
      </v-col>
      <v-col cols="1">
        <v-btn @click="modify('I')">변경</v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-btn @click="deleteAccount"> 계정 삭제 </v-btn>

        <v-dialog v-model="dialog" width="auto">
          <v-card
            max-width="600"
            prepend-icon="mdi-account"
            text="계정을 삭제 시 복구 할 수 없습니다. 반드시 중요한 프로젝트 관련 정보를 모두 확인 해 주세요."
            title="계정 삭제"
          >
            <v-card-text>현재 진행 중인 프로젝트</v-card-text>
            <div class="scrollable-container">
              <v-row v-for="(card, index) in cards" :key="index" md="4">
                <v-col>
                  <v-card>
                    <v-card-text>
                      {{ card.text }}
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </div>
            <div v-show="!is_send_email">
              <v-card-text>현재 이메일</v-card-text>
              <v-text-field
                label="e-mail"
                variant="solo"
                placeholder="sync@sync-team.co.kr"
                v-model="email"
              ></v-text-field>
            </div>
            <div v-show="is_send_email">
              <v-card-text>인증 코드</v-card-text>
              <v-text-field
                label="코드"
                variant="solo"
                placeholder="인증 코드를 입력 해 주세요."
                v-model="token"
              ></v-text-field>
            </div>
            <template v-slot:actions>
              <v-btn
                class="mx-auto"
                :text="is_send_email ? '계정 영구 삭제' : '이메일 인증 보내기'"
                @click="is_send_email ? verificationToken() : sendEmail()"
              ></v-btn>
            </template>
          </v-card>
        </v-dialog>
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
.scrollable-container {
  max-height: 200px;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
<script>
import setting from "@/services/setting-service";

export default {
  name: "account",
  created() {},
  props: {
    userId: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    nickname: {
      type: String,
      required: true,
    },
    position: {
      typs: String,
      required: true,
    },
    introduction: {
      typs: String,
      required: true,
    },
  },
  data: function () {
    return {
      cards: [],
      is_send_email: false,
      dialog: false,
      model_userId: null,
      model_username: null,
      model_nickname: null,
      model_position: null,
      model_introduction: null,
      email: null,
      token: null,
    };
  },
  methods: {
    modify(type) {
      let params = this.addParams(type);
      setting
        .putUserInfo(params)
        .then((result) => {
          alert(result.message);
        })
        .catch((error) => {
          console.error("Error: ", error);
        });
    },
    addParams(type) {
      let params;
      if (type === "N") {
        params = { type: type, value: this.model_nickname };
      } else if (type === "P") {
        params = { type: type, value: this.model_position };
      } else if (type === "I") {
        params = { type: type, value: this.model_introduction };
      } else {
        console.error("유효하지 않은 TYPE 입니다.");
      }
      return params;
    },
    deleteAccount() {
      this.dialog = true;

      setting
        .getProject()
        .then((result) => {
          if (result.result) {
            this.cards = []; // Initialize the cards array
            for (let i = 0; i < result.value.length; i++) {
              this.cards.push({ text: result.value[i].title });
            }
          } else {
            alert(result.message);
          }
        })
        .catch((error) => {
          console.error("Error: ", error);
        });
    },
    sendEmail() {
      let body = { email: this.email };
      setting
        .postEmailSend(body)
        .then((result) => {
          if (result.result) {
            alert(result.message);
            this.is_send_email = true;
          } else {
            alert(result.message);
          }
        })
        .catch((error) => {
          console.error("Error: ", error);
        });
    },
    verificationToken() {
      let params = { email: this.email, token: this.token };
      setting.getEmailVerification(params).then((result) => {
        if (result.result) {
          alert("이용해 주셔서 감사합니다.");
          // window.location.href = "https://localhost/";
          window.location.href = "https://www.sync-team.co.kr/";
        } else {
          alert(result.message);
        }
      });
    },
  },
  updated() {
    this.model_userId = this.userId;
    this.model_username = this.username;
    this.model_nickname = this.nickname;
    this.model_position = this.position;
    this.model_introduction = this.introduction;
  },
};
</script>
