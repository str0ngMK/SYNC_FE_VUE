<template>
  <v-container class="text-center">
    <v-row>
      <v-col>
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
      </v-col>
    </v-row>
    <v-row>
      <v-col colas="12" class="d-flex justify-center">
        <img ref="image" :src="src" class="hidden" />
      </v-col>
    </v-row>
    <v-row class="d-flex justify-center">
      <v-col cols="1">
        <v-btn class="w-32 p-2 m-2" @click="cropImage()"> 저장 </v-btn>
      </v-col>
      <v-col cols="1">
        <v-btn class="w-32 p-2 m-2"> 취소 </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
img {
  display: block;
  max-width: 500px;
  max-height: 500px;
}
.img-upload {
  width: 35px;
  height: 35px;
  background-color: white;
  border: 1px solid gray;
  border-radius: 50%;
  cursor: pointer;
}
</style>

<script>
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.css";

export default {
  name: "test",
  mounted() {
    this.image = this.$refs.image;
  },
  computed: {},
  data: function () {
    return {
      src: null,
      image: {},
      cropper: null,
    };
  },
  methods: {
    onFileChange(e) {
      const files = e.target.files;
      if (files && files.length > 0) {
        const file = files[0];
        const url = URL.createObjectURL(file);
        this.src = url;
        this.$nextTick(() => {
          if (this.cropper) {
            this.cropper.destroy();
          }
          this.cropper = new Cropper(this.image, {
            viewMode: 1,
            movable: true,
            scalable: true,
            zoomable: false,
            cropBoxResizable: true,
          });
        });
      }
    },
    cropImage() {
      if (this.cropper) {
        const canvas = this.cropper.getCroppedCanvas();
        this.src = canvas.toDataURL("image/png");
        this.cropper.destroy();
        this.cropper = null;
      }
    },
  },
};
</script>
