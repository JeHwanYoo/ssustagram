<template>
  <b-nav tabs align="center">
    <b-nav-item :to="{ name: 'home' }" exact exact-active-class="active"
      >홈</b-nav-item
    >
    <b-nav-item :to="{ name: 'new' }" exact exact-active-class="active"
      >업로드</b-nav-item
    >
    <b-nav-item :to="{ name: 'profile' }" exact exact-active-class="active"
      >프로필</b-nav-item
    >
    <b-nav-item :to="{ name: 'follow' }" exact exact-active-class="active"
      >팔로우</b-nav-item
    >
    <b-nav-item :to="{ name: 'msg' }" exact exact-active-class="active"
      >메세지</b-nav-item
    >
    <b-btn @click="logout">로그아웃</b-btn>
  </b-nav>
</template>

<script>
export default {
  computed: {},
  methods: {
    logout() {
      this.$router.replace({ path: "/" });
    },
  },
};
</script>
