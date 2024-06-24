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
  created() {},
  props: {
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
      model_username: null,
      model_nickname: null,
      model_position: null,
      model_introduction: null,
    };
  },
  methods: {
    modify(type) {
      let params = this.addParams(type);
      setting
        .putUserInfo(params)
        .then((result) => {
          if (result.result) {
            alert(result.message);
          } else {
            alert("오류");
          }
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
  },
  updated() {
    this.model_username = this.username;
    this.model_nickname = this.nickname;
    this.model_position = this.position;
    this.model_introduction = this.introduction;
  },
};
</script>
