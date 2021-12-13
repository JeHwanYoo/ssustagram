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
    onUpload({ encodeds, text }) {
      console.log(encodeds, text);
    },
  },
};
</script>