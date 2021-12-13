<template>
  <b-container>
    <b-row class="my-2">
      <b-col>
        <h2 class="display-5">팔로우 목록</h2>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12">
        <b-list-group>
          <b-list-group-item v-for="follow in follows" :key="follow.userid">
            <b-avatar :text="follow.name[0]"> </b-avatar>
            <span>{{ follow.name }}({{ follow.userid }})</span>
            <b-button
              class="float-right"
              variant="light"
              v-if="follow.following"
            >
              팔로잉
            </b-button>
            <b-button class="float-right" variant="primary" v-else>
              팔로우
            </b-button>
          </b-list-group-item>
        </b-list-group>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
// 테스트 데이터 입니다.
const mockFollows = [
  { userid: "abcd0123", name: "foo", following: false },
  { userid: "qwer1234", name: "moo", following: true },
  { userid: "football", name: "manager", following: false },
];

export default {
  layout: "defaultWithTitle",
  data() {
    return {
      follows: mockFollows,
    };
  },
};
</script>
