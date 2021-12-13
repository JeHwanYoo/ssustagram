<template>
  <app-edit
    class="my-3"
    :initFiles="initFiles"
    :initText="initText"
    @upload="onUpload"
  />
</template>

<script>
import AppEdit from "~/components/AppEdit.vue";

// 테스트용 데이터 입니다.
const mockImages = [
  "https://via.placeholder.com/600x600/abcd123456/808080",
  "https://via.placeholder.com/600x600/abcd123456/808080",
];
const mockText = "안녕하세요.\n반갑습니다.";

export default {
  layout: "defaultWithTitle",
  components: {
    AppEdit,
  },
  data() {
    return {
      initFiles: mockImages,
      initText: mockText,
    };
  },
  methods: {
    onUpload({ encodeds, text }) {
      console.log(encodeds, text);
    },
  },
};
</script>