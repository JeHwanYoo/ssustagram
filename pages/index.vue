<template>
  <b-container>
    <b-row>
      <b-col>
        <b-jumbotron
          class="my-5 text-center"
          header="SSUSTAGRAM"
          lead="친구들과 사진을 공유하며 재미있게 놀아보세요."
        >
          <hr />
          <b-form @submit="onSubmit">
            <app-input
              label="유저 id"
              placeholder="id를 입력해주세요."
              @input="onUserIdInput"
            />
            <app-input
              label="비밀번호"
              placeholder="password를 입력해주세요."
              @input="onPasswordInput"
              type="password"
            />
            <app-button text="로그인" type="submit" variant="primary" />
            <app-button
              text="회원가입"
              type="button"
              variant="success"
              @click="goAccountPage"
            />
          </b-form>
        </b-jumbotron>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import AppButton from "~/components/AppButton.vue";
import AppInput from "~/components/AppInput.vue";
import isEmpty from "validator/lib/isEmpty";

export default {
  components: {
    AppButton,
    AppInput,
  },
  data() {
    return {
      userid: "",
      password: "",
    };
  },
  computed: {
    validAll() {
      return !isEmpty(this.userid) && !isEmpty(this.password);
    },
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      if (this.validAll) {
        this.$router.replace({ name: "home" });
      } else {
        alert("아이디 혹은 패스워드를 입력하지 않았습니다.");
      }
    },
    goAccountPage() {
      this.$router.push({ name: "account" });
    },
    onUserIdInput(userid) {
      this.userid = userid;
    },
    onPasswordInput(password) {
      this.password = password;
    },
  },
};
</script>

