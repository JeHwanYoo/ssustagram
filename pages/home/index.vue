<template>
  <div>
    <section class="search">
      <home-search />
      <hr />
    </section>
    <section class="posts"></section>
  </div>
</template>

<script>
import HomeSearch from "~/components/HomeSearch.vue";

export default {
  layout: "defaultWithTitle",
  components: {
    HomeSearch,
  },
};
</script>

<style>
</style>