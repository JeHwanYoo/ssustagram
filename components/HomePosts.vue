<template>
  <b-container fluid>
    <b-row>
      <b-col cols="4" v-for="post in posts" :key="post.imgid">
        <b-card class="mb-3">
          <app-carousel :images="post.files" />
          <b-card-body>
            <b-card-text v-html="applyForHashtags(post.text, post.hashtags)">
            </b-card-text>
          </b-card-body>
          <b-card-footer class="px-1 py-1">
            <b-container fluid>
              <b-row>
                <b-col class="px-2" style="line-height: 24px" cols="6">
                  <div class="text-truncate" style="font-size: 5px">
                    {{ post.name }}({{ post.userid }})
                  </div>
                  <div style="font-size: 5px">
                    {{ post.created_at | datetime }}
                  </div>
                </b-col>
                <b-col
                  class="px-0 text-center"
                  style="line-height: 48px"
                  cols="6"
                  v-if="post.me"
                >
                  <b-btn variant="warning" size="sm">수정</b-btn>
                  <b-btn variant="danger" size="sm">삭제</b-btn>
                </b-col>
              </b-row>
            </b-container>
          </b-card-footer>
        </b-card>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12">
        <b-pagination
          v-model="currentPage"
          :total-rows="total"
          :per-page="perPage"
          align="center"
        ></b-pagination>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import AppCarousel from "~/components/AppCarousel.vue";
import moment from "moment";

export default {
  components: {
    AppCarousel,
  },
  props: {
    posts: Array,
    pagination: Object,
  },
  data() {
    return {
      currentPage: 1,
      total: 1,
      perPage: 6,
    };
  },
  filters: {
    datetime(milisec) {
      return moment(milisec).format("YYYY-MM-DD HH:mm");
    },
  },
  methods: {
    applyForHashtags(text, hashtags) {
      let newText = text;
      for (let hashtag of hashtags) {
        const url = `/posts?query=${hashtag.slice(1)}&type=h&limit=6&page=1`;
        newText = newText
          .split(hashtag)
          .join(`<a href='${url}'>${hashtag}</a>`); // replaceAll
      }
      return newText;
    },
  },
  mounted() {
    this.total = this.pagination.total;
    this.currentPage = this.pagination.currentPage;
  },
};
</script>
