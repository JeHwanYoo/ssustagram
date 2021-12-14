<template>
  <b-container class="my-3 text-center">
    <b-row>
      <b-col cols="6" offset="3">
        <b-card>
          <b-avatar
            class="my-2"
            variant="primary"
            :text="firstWord"
            size="6rem"
          >
          </b-avatar>
          <b-card-text>
            <span>{{ userName }}</span>
            <span>({{ userId }})</span>
          </b-card-text>
          <b-card-text>
            <span>팔로워: </span>
            <div class="d-inline-block" style="width: 80px">
              <strong>{{ follower }}</strong>
            </div>
            <span>팔로우: </span>
            <div class="d-inline-block" style="width: 80px">
              <strong>{{ follow }}</strong>
            </div>
          </b-card-text>
          <b-card-text>
            <span>현재 시간:</span>
            <div class="d-inline-block" style="width: 200px">
              {{ currentDate }}
            </div>
          </b-card-text>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import moment from "moment";
// AVATAR 기능은 명세에 없어서 구현하지 않았지만 있다고 가정하고 진행합니다.
export default {
  layout: "defaultWithTitle",
  data() {
    return {
      firstWord: "a",
      userId: "",
      userName: "",
      currentDate: moment().format("YYYY-MM-DD HH:mm:ss"),
      follow: 0,
      follower: 0,
    };
  },
  async mounted() {
    setInterval(() => {
      this.currentDate = moment().format("YYYY-MM-DD HH:mm:ss");
    }, 1000);

    const { data } = await this.$axios.get("/api/my");
    this.userId = data.userid;
    this.userName = data.name;
    this.firstWord = data.name[0];
    this.follow = data.n_follows;
    this.follower = data.n_followers;
  },
};
</script>
