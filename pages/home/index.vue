<template>
  <div class="my-3">
    <section class="search">
      <home-search />
      <hr />
    </section>
    <section class="posts">
      <home-posts :posts="posts" :pagination="pagination" />
    </section>
  </div>
</template>

<script>
import HomeSearch from "~/components/HomeSearch.vue";
import HomePosts from "~/components/HomePosts.vue";

// 개발용 mock 오브젝트 입니다.
import mockImgPosts from "./mock-images";
import mockPagination from "./mock-page";

export default {
  layout: "defaultWithTitle",
  components: {
    HomeSearch,
    HomePosts,
  },
  data() {
    return {
      posts: mockImgPosts,
      pagination: mockPagination,
    };
  },
};
</script>

<style>
</style>