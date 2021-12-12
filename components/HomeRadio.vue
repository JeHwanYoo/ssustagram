<template>
  <b-form-radio-group v-model="selected">
    <b-form-radio value="content">일반 텍스트</b-form-radio>
    <b-form-radio value="author">작성자</b-form-radio>
    <b-form-radio value="hashtag">해시태그</b-form-radio>
  </b-form-radio-group>
</template>

<script>
export default {
  watch: {
    selected(newValue) {
      this.$emit("select", newValue);
    },
  },
  data() {
    return {
      selected: "content",
    };
  },
};
</script>
