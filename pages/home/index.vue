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
      posts: [],
      pagination: mockPagination,
    };
  },
  async mounted() {
    setTimeout(async () => {
      const response = await this.$axios.get("/api/posts");
      const images = response.data;
			
      for (let i = 0; i < images.length; i++) {
        // images[i]["files"] = JSON.parse(images[i]["files"]);
        // images[i]["hashtags"] = JSON.parse(images[i]["hashtags"]);
        this.posts.push(images[i]);
      }

    }, 200);
  },
};
</script>

<style>
</style>
