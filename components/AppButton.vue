<template>
  <b-btn :type="type" :variant="variant" :herf="href" :size="size" :block="block" @click="onClick">{{ text }}</b-btn>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: ''
    },
    variant: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    },
    href: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: ''
    },
    block: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    onClick(evt) {
      this.$emit('click', evt)
    }
  }
}
</script>
