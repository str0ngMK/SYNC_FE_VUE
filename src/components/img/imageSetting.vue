<template>
  <v-container class="text-center">
    <div v-show="!select_image">
      <v-row>
        <v-col>
          <!-- <div class="img mr-5"> -->
          <div
            class="img mr-5"
            :style="{ backgroundImage: 'url(' + this.profileImg + ')' }"
          >
            <!-- <img :src="profileImg" /> -->
            <label for="file">
              <v-icon icon="mdi-camera" class="img-upload"></v-icon>
            </label>
            <input
              type="file"
              name="file"
              id="file"
              @change="onFileChange"
              class="mb-4 border"
              style="display: none"
            />
          </div>
        </v-col>
      </v-row>
    </div>
    <!-- <div v-show="select_image"> -->
    <!-- <v-dialog v-model="select_image" content-class="custom-dialog">
      <v-card max-width="auto" max-height="auto"> -->
    <v-dialog v-model="select_image" width="auto">
      <v-card class="custom-dialog h-screen">
        <v-card-text>
          <img ref="image" :src="src" class="preview_img hidden" />
        </v-card-text>
        <template v-slot:actions>
          <v-btn class="ms-auto" text="저장" @click="cropImage()"></v-btn>
          <v-btn class="ms-auto" text="취소" @click="select_image = false">
          </v-btn>
        </template>
      </v-card>
    </v-dialog>

    <!-- <v-row>
        <v-col colas="12" class="d-flex justify-center">
          <img ref="image" :src="src" class="hidden" />
        </v-col>
      </v-row>
      <v-row class="d-flex justify-center">
        <v-col cols="1">
          <v-btn class="w-32 p-2 m-2" @click="cropImage()"> 저장 </v-btn>
        </v-col>
        <v-col cols="1">
          <v-btn class="w-32 p-2 m-2" @click="select_image = false">
            취소
          </v-btn>
        </v-col>
      </v-row> -->
    <!-- </div> -->
  </v-container>
</template>

<style scoped>
/* img {
  display: block;
  max-width: 500px;
  max-height: 500px;
} */

.preview_img {
  display: block;
  max-width: 500px;
  max-height: 500px;
}

.img {
  width: 100px;
  height: 100px;
  background-color: lightgray;
  background-size: cover;
  background-position: center center;
  border-radius: 50%;
  position: relative;
}

.img-upload {
  width: 35px;
  height: 35px;
  background-color: white;
  border: 1px solid gray;
  border-radius: 50%;
  cursor: pointer;
  position: absolute;
  z-index: 1;
  bottom: 0;
  right: 0;
}
.custom-dialog {
  /* max-height: 80vh; */
  /* width: 100vh; */
  max-width: 1000px;
  min-width: 100vh;
  overflow-y: none;
  overflow-x: none;
}
</style>

<script>
import setting from "@/services/setting-service";
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.css";

export default {
  name: "test",
  mounted() {
    this.image = this.$refs.image;
  },
  computed: {},
  props: {
    profileImg: {
      type: String,
      required: true,
    },
  },
  data: function () {
    return {
      src: null,
      image: {},
      cropper: null,
      select_image: false,
      is_profileImg: false,
    };
  },
  methods: {
    // onFileChange(e) {
    //   const files = e.target.files;
    //   if (files && files.length > 0) {
    //     const file = files[0];
    //     const url = URL.createObjectURL(file);
    //     this.src = url;
    //     this.$nextTick(() => {
    //       if (this.cropper) {
    //         this.cropper.destroy();
    //       }
    //       this.cropper = new Cropper(this.image, {
    //         viewMode: 1,
    //         movable: true,
    //         scalable: true,
    //         zoomable: false,
    //         cropBoxResizable: true,
    //       });
    //     });
    //     this.$nextTick(() => {
    //       this.select_image = true;
    //     });
    //   }
    // },
    onFileChange(e) {
      const files = e.target.files;
      if (files && files.length > 0) {
        const file = files[0];
        const url = URL.createObjectURL(file);
        this.src = url;
        this.select_image = true;
      }
    },
    cropImage() {
      this.select_image = false;
      if (this.cropper) {
        const canvas = this.cropper.getCroppedCanvas();
        // this.src = canvas.toDataURL("image/png");
        this.cropper.destroy();
        this.cropper = null;

        canvas.toBlob((blob) => {
          let formData = new FormData();
          formData.append("profileImg", blob, "img.jpg");
          setting
            .putProfileImg(formData)
            .then((result) => {
              console.log(result);
              if (result.result) {
                // this.select_image = false;
                location.reload();
              } else {
                alert(result.message);
              }
            })
            .catch((error) => {
              console.error("Error: ", error);
            });
        }, "image/jpeg");
      }
    },
  },
  watch: {
    select_image(newVal) {
      if (newVal) {
        this.$nextTick(() => {
          if (this.cropper) {
            this.cropper.destroy();
          }
          this.cropper = new Cropper(this.$refs.image, {
            viewMode: 1,
            movable: true,
            scalable: true,
            zoomable: false,
            cropBoxResizable: true,
          });
        });
      } else {
        if (this.cropper) {
          this.cropper.destroy();
          this.cropper = null;
        }
      }
    },
  },
  updated() {
    console.log("이미지다: ", this.profileImg);
    if (this.profileImg !== null) {
      this.is_profileImg = true;
    }
  },
};
</script>
