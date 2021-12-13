<template>
  <b-carousel
    id="carousel-1"
    v-model="slide"
    controls
    indicators
    :interval="0"
    style="text-shadow: 1px 1px 2px #333"
    img-height="480"
    @sliding-start="onSlideStart"
    @sliding-end="onSlideEnd"
  >
    <b-carousel-slide
      v-for="(image, no) in images"
      :key="no"
      :img-src="image"
    ></b-carousel-slide>
  </b-carousel>
</template>

<script>
export default {
  props: {
    images: Array,
  },
  data() {
    return {
      slide: 0,
    };
  },
  methods: {
    onSlideStart() {
      this.$emit("slide-start", this.slide);
    },
    onSlideEnd() {
      this.$emit("slide-end", this.slide);
    },
  },
};
</script>
