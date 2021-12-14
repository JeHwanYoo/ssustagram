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
              placeholder="당신의 고유한 id를 입력하세요."
              invalidFeedback="영문과 숫자로만 조합해주세요."
              validFeedback="중복되는 id가 없는지 확인해주세요."
              @input="onUserIdInput"
              :validation="isAlphanumeric"
            />
            <b-form-group>
              <app-button
                text="중복확인"
                variant="primary"
                type="button"
                @click="checkUserIdDup"
                :block="false"
              />
              <span v-if="userIdCheck === 1" class="text-success"
                >확인되었습니다.</span
              >
              <span v-else-if="userIdCheck === -1" class="text-danger"
                >유저 id가 중복되었습니다.</span
              >
            </b-form-group>
            <app-input
              label="이메일"
              type="email"
              placeholder="이메일을 입력하세요."
              invalidFeedback="이메일 형식이 아닙니다."
              validFeedback="중복되는 이메일이 없는지 확인해주세요."
              @input="onEmailInput"
              :validation="isEmail"
            />
            <b-form-group>
              <app-button
                text="중복확인"
                variant="primary"
                type="button"
                @click="checkEmailDup"
                :block="false"
              />
              <span v-if="emailCheck === 1" class="text-success"
                >확인되었습니다.</span
              >
              <span v-else-if="emailCheck === -1" class="text-danger"
                >이메일이 중복되었습니다.</span
              >
            </b-form-group>
            <app-input
              label="사용자 이름"
              placeholder="다른 사람에게 표시될 이름을 입력하세요."
              @input="onNameInput"
            />
            <app-input
              label="비밀번호"
              type="password"
              @input="onPasswordInput"
            />
            <app-input
              label="비밀번호 확인"
              type="password"
              invalidFeedback="비밀번호가 일치하지 않습니다."
              validFeedback="비밀번호가 일치합니다."
              @input="onPasswordCheckInput"
              :validation="isPasswordMatching"
            />
            <app-button text="회원가입" variant="success" type="submit" />
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
import isEmail from "validator/lib/isEmail";
import isAlphanumeric from "validator/lib/isAlphanumeric";

export default {
  components: {
    AppButton,
    AppInput,
  },
  computed: {
    isEmail() {
      return isEmail(this.email);
    },
    isAlphanumeric() {
      return isAlphanumeric(this.userid);
    },
    isPasswordMatching() {
      return this.password === this.passwordCheck;
    },
    validAll() {
      return (
        !isEmpty(this.userid) &&
        !isEmpty(this.email) &&
        !isEmpty(this.name) &&
        !isEmpty(this.password) &&
        this.isEmail &&
        this.isAlphanumeric &&
        this.isPasswordMatching &&
        this.userIdCheck === 1 &&
        this.emailCheck === 1
      );
    },
  },
  methods: {
    async onSubmit(event) {
      event.preventDefault();
      if (this.validAll) {
        console.log(
          this.userid,
          this.email,
          this.name,
          this.password,
          this.passwordCheck
        );
        try {
          const data = await this.$axios.get("/api/account/users/formail0001");
          console.log(data);
          // this.$router.replace({ name: "home" });
        } catch (e) {
          alert("입력 형식이 잘못되었습니다.");
        }
      } else {
        alert("입력 형식이 잘못되었습니다.");
      }
    },
    onUserIdInput(userid) {
      this.userid = userid;
    },
    onEmailInput(email) {
      this.email = email;
    },
    onNameInput(name) {
      this.name = name;
    },
    onPasswordInput(password) {
      this.password = password;
    },
    onPasswordCheckInput(passwordCheck) {
      this.passwordCheck = passwordCheck;
    },
    checkUserIdDup() {
      this.userIdCheck = 1;
    },
    checkEmailDup() {
      this.emailCheck = 1;
    },
  },
  data() {
    return {
      userid: "",
      email: "",
      name: "",
      password: "",
      passwordCheck: "",
      userIdCheck: 0,
      emailCheck: 0,
    };
  },
};
</script>