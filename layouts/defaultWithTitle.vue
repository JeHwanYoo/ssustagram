<template>
  <b-container>
    <b-row class="my-2">
      <b-col>
        <h1 class="display-5">SSUSTAGRAM</h1>
      </b-col>
    </b-row>
    <b-row class="my-2">
      <b-col>
        <app-menu />
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <nuxt />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import AppMenu from "~/components/AppMenu.vue";

export default {
  components: {
    AppMenu,
  },
  async mounted() {
    try {
      await this.$axios.get("/api/login/check");
    } catch (e) {
      this.$router.replace({ path: "/" });
    }
  },
};
</script>

<style>
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}
</style>

