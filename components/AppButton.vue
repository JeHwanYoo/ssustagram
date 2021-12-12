<template>
  <b-btn
    :type="type"
    :variant="variant"
    :herf="href"
    :size="size"
    :block="block"
    @click="onClick"
  >
    <template v-if="isIcon">
      <b-icon :icon="icon"></b-icon>
    </template>
    <template v-else>
      {{ text }}
    </template>
  </b-btn>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: "",
    },
    variant: {
      type: String,
      default: "",
    },
    text: {
      type: String,
      default: "",
    },
    icon: {
      type: String,
      default: "",
    },
    href: {
      type: String,
      default: "",
    },
    size: {
      type: String,
      default: "",
    },
    block: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    isIcon() {
      return this.icon.length > 0;
    },
  },
  methods: {
    onClick(evt) {
      this.$emit("click", evt);
    },
  },
};
</script>
