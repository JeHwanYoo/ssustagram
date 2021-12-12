<template>
  <b-form-group :label="label" :description="description">
    <b-form-input
      :id="inputId"
      :type="type"
      :placeholder="placeholder"
      :required="required"
      v-model="inputData"
      @input="onInput"
      :state="isInput && isFeedback ? validation : null"
    ></b-form-input>
    <template v-if="isInput && isFeedback">
      <b-form-invalid-feedback :state="validation">{{
        invalidFeedback
      }}</b-form-invalid-feedback>
      <b-form-valid-feedback :state="validation">{{
        validFeedback
      }}</b-form-valid-feedback>
    </template>
  </b-form-group>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    inputId: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "text",
    },
    placeholder: {
      type: String,
      default: "",
    },
    required: {
      type: Boolean,
      default: false,
    },
    validFeedback: {
      type: String,
      default: "",
    },
    invalidFeedback: {
      type: String,
      default: "",
    },
    validation: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    isInput() {
      return this.inputData.length > 0;
    },
    isFeedback() {
      return this.validFeedback.length > 0 && this.invalidFeedback.length > 0;
    },
  },
  data() {
    return {
      inputData: "",
    };
  },
  methods: {
    onInput() {
      this.$emit("input", this.inputData);
    },
  },
};
</script>
