<template>
  <app-edit
    class="my-3"
    :initFiles="initFiles"
    :initText="initText"
    @upload="onUpload"
    @remove="onRemoved"
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
      initFiles: [],
      initText: "",
    };
  },
  methods: {
    async onUpload({ encodeds, text }) {
      try {
        await this.$axios.patch(`/api/images/${this.$route.query.imgid}`, {
          files: encodeds,
          text,
        });
        this.$router.push({ name: "home" });
      } catch (e) {
        alert("수정에 실패했습니다!");
      }
    },
    async onRemoved() {
      try {
        await this.$axios.delete(`/api/images/${this.$route.query.imgid}`);
        this.$router.push({ name: "home" });
      } catch (e) {
        alert("삭제에 실패했습니다!");
      }
    },
  },
  async mounted() {
    const response = await this.$axios.get(
      `/api/images/${this.$route.query.imgid}`
    );
    this.initFiles = JSON.parse(response.data.files);
    this.initText = response.data.text;
  },
};
</script>