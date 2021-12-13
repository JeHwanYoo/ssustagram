<template>
  <app-upload @upload="onUpload"></app-upload>
</template>

<script>
import AppUpload from "~/components/AppUpload.vue";

export default {
  layout: "defaultWithTitle",
  components: {
    AppUpload,
  },
  methods: {
    onUpload(encodeds) {
      console.log(encodeds);
    },
  },
};
</script>
