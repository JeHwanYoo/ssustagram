<template>
  <b-container fluid class="my-2">
    <b-row>
      <b-col class="px-0 pr-2" cols="10">
        <app-input
          placeholder="검색어를 입력하세요."
          @input="onQueryInput"
        ></app-input>
      </b-col>
      <b-col class="px-0" cols="2">
        <app-button
          variant="primary"
          icon="search"
          @click="search"
        ></app-button>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <home-radio @select="onSelect" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import AppInput from "~/components/AppInput.vue";
import AppButton from "~/components/AppButton.vue";
import HomeRadio from "~/components/HomeRadio.vue";
import isEmpty from "validator/lib/isEmpty";

export default {
  components: {
    AppInput,
    AppButton,
    HomeRadio,
  },
  computed: {
    validAll() {
      return !isEmpty(this.query);
    },
  },
  data() {
    return {
      query: "",
      selected: "content",
    };
  },
  methods: {
    onSelect(selected) {
      this.selected = selected;
    },
    onQueryInput(query) {
      this.query = query;
    },
    search() {
      if (this.validAll) {
        console.log(this.selected, this.query);
      } else {
        alert("검색어를 입력해주세요.");
      }
    },
  },
};
</script>
