<template>
  <app-upload class="my-3" @upload="onUpload"></app-upload>
</template>

<script>
import AppUpload from "~/components/AppUpload.vue";

export default {
  layout: "defaultWithTitle",
  components: {
    AppUpload,
  },
  methods: {
    async onUpload({ encodeds, text }) {
      try {
        await this.$axios.post("/api/images", {
          files: encodeds,
          text,
        });

        this.$router.push({ name: "home" });
      } catch (e) {
        alert("업로드에 실패했습니다!");
      }
    },
  },
};
</script>
