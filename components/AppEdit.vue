<template>
  <b-container>
    <b-row>
      <b-col>
        <b-form-file
          ref="file-input"
          placeholder="파일을 추가하려면 여기를 누르세요."
          drop-placeholder="Drop file here..."
          multiple
          accept="image/*"
          @input="onInput"
        ></b-form-file>
      </b-col>
    </b-row>
    <b-row class="my-2" v-if="encodeds && encodeds.length > 0">
      <b-col>
        <h2 class="display-5">미리보기</h2>
      </b-col>
    </b-row>
    <b-row class="mt-2 mb-5">
      <b-col cols="1"></b-col>
      <b-col v-for="(encoded, no) in encodeds" :key="no" cols="2">
        <b-img thumbnail :src="encoded" width="600" height="600"></b-img>
        <div class="my-1 text-center">
          <b-btn variant="light" size="sm" @click="removeFile(no)">
            <b-icon variant="danger" icon="x-octagon"></b-icon>
          </b-btn>
          <input
            :ref="`hidden-input-${no}`"
            class="d-none"
            type="file"
            accept="image/*"
            @input="(event) => onReplaced(event.target.files[0], no)"
          />
          <b-btn variant="light" size="sm" @click="editFile(no)">
            <b-icon variant="warning" icon="pencil-square"></b-icon>
          </b-btn>
        </div>
      </b-col>
    </b-row>
    <b-row class="my-5" v-if="encodeds && encodeds.length > 0">
      <b-col cols="12" class="text-center">
        <b-textarea v-model="text"></b-textarea>
      </b-col>
    </b-row>
    <b-row v-if="encodeds && encodeds.length > 0">
      <b-col cols="12" class="text-center">
        <b-btn size="lg" variant="success" @click="upload">업로드!</b-btn>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
// 참고: https://doolyit.tistory.com/182
function encodingImage(encodeds, file, width, height, i = -1) {
  const img = document.createElement("img");
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const reader = new FileReader();

  canvas.width = width;
  canvas.height = height;

  reader.onload = (e) => {
    img.onload = () => {
      ctx.drawImage(img, 0, 0, width, height);
      if (i === -1) {
        encodeds.push(canvas.toDataURL("image/jpg"));
      } else {
        encodeds.splice(i, 1, canvas.toDataURL("image/jpg"));
      }
    };
    img.src = e.target.result;
  };

  reader.readAsDataURL(file);
}

export default {
  props: {
    initFiles: {
      type: Array,
      default: () => [],
    },
    initText: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      encodeds: [],
      text: "",
    };
  },
  methods: {
    onInput(files) {
      const newLength = files.length;
      const prevLength = this.encodeds.length;

      if (newLength + prevLength > 5) {
        alert("업로드는 최대 5개까지 가능합니다.");
      } else {
        for (const file of files) {
          encodingImage(this.encodeds, file, 600, 600);
        }
      }

      this.$refs["file-input"].reset();
    },
    upload() {
      this.$emit("upload", {
        encodeds: this.encodeds,
        text: this.text,
      });
    },
    removeFile(index) {
      this.encodeds.splice(index, 1);
    },
    editFile(index) {
      this.$refs[`hidden-input-${index}`][0].click();
    },
    onReplaced(file, no) {
      encodingImage(this.encodeds, file, 600, 600, no);
    },
  },
  mounted() {
    this.encodeds = this.initFiles;
    this.text = this.initText;
  },
};
</script>
