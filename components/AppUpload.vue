<template>
  <b-container>
    <b-row>
      <b-col>
        <b-form-file
          ref="file-input"
          v-model="files"
          placeholder="파일을 선택하거나 이곳으로 드롭해보세요."
          drop-placeholder="Drop file here..."
          multiple
          accept="image/*"
          @input="onInput"
        ></b-form-file>
      </b-col>
    </b-row>
    <b-row class="my-2" v-if="files && files.length > 0">
      <b-col>
        <h2 class="display-5">미리보기</h2>
      </b-col>
    </b-row>
    <b-row class="mt-2 mb-5">
      <b-col cols="1"></b-col>
      <b-col v-for="encoded in encodeds" :key="encoded.fileName" cols="2">
        <b-img thumbnail :src="encoded.base64" width="600" height="600"></b-img>
      </b-col>
    </b-row>
    <b-row v-if="files && files.length > 0">
      <b-col cols="12" class="text-center">
        <b-btn size="lg" variant="success" @click="upload">업로드!</b-btn>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
// 참고: https://doolyit.tistory.com/182
function encodingImage(encodeds, file, width, height) {
  const img = document.createElement("img");
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const reader = new FileReader();

  canvas.width = width;
  canvas.height = height;
  encodeds.splice(0, encodeds.length);

  reader.onload = (e) => {
    img.onload = () => {
      ctx.drawImage(img, 0, 0, width, height);
      encodeds.push({
        fileName: file.name,
        base64: canvas.toDataURL("image/jpg"),
      });
    };
    img.src = e.target.result;
  };

  reader.readAsDataURL(file);
}

export default {
  data() {
    return {
      files: null,
      encodeds: [],
    };
  },
  methods: {
    onInput() {
      if (this.files.length > 5) {
        alert("업로드는 최대 5개까지 가능합니다.");
        this.$refs["file-input"].reset();
      }
      for (const file of this.files) {
        encodingImage(this.encodeds, file, 600, 600);
      }
    },
    upload() {
      this.$emit("upload", this.encodeds);
    },
  },
};
</script>
