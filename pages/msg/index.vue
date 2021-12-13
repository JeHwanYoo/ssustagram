<template>
  <b-container>
    <b-row class="my-2">
      <b-col>
        <h2 class="display-5">Direct Message</h2>
      </b-col>
    </b-row>
    <b-row class="border" style="height: 600px">
      <b-col class="px-0" cols="4">
        <b-list-group style="height: 600px; overflow-y: auto">
          <b-list-group-item
            class="rounded-0 border-right-0 border-left-0"
            v-for="follow in follows"
            :key="follow.userid"
            button
            :active="isActive(follow.userid)"
            @click="select(follow.userid)"
          >
            <b-avatar class="mr-2" :text="follow.name[0]"> </b-avatar>
            <div class="d-inline-block text-truncate" style="width: 80%">
              {{ follow.name }}({{ follow.userid }})
            </div>
          </b-list-group-item>
        </b-list-group>
      </b-col>
      <b-col class="border px-0" cols="8">
        <b-container fluid>
          <b-row style="height: 560px; overflow-y: auto">
            <b-col>
              <b-list-group>
                <b-list-group-item
                  class="border-0"
                  v-for="(chat, no) in chats"
                  :key="no"
                >
                  <div v-html="getWhom(chat.from)"></div>
                  <pre :class="getFloat(chat.from)">{{ chat.content }}</pre>
                </b-list-group-item>
              </b-list-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col class="px-0" cols="10" style="height: 38px">
              <app-input
                inputClass="rounded-0 border-dark"
                placeholder="메세지를 보내보세요!"
              />
            </b-col>
            <b-col class="px-0" cols="2">
              <app-button
                type="button"
                variant="outline-dark"
                icon="arrow-return-right"
                buttonClass="rounded-0"
              />
            </b-col>
          </b-row>
        </b-container>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import AppInput from "~/components/AppInput.vue";
import AppButton from "~/components/AppButton.vue";
import moment from "moment";
// 테스트 데이터 입니다.
const mockFollows = [
  { userid: "abcd0123", name: "foo" },
  { userid: "qwer1234", name: "moo" },
  { userid: "football", name: "manager" },
  { userid: "doosdsad", name: "sadsadsa" },
  { userid: "asdsasad", name: "wqeqwew" },
  { userid: "sxsdas", name: "asdadas" },
  { userid: "sadsa", name: "asdsalk" },
  { userid: "lsfkasm", name: "dsadks" },
  { userid: "xcamsamds", name: "dsadasdsaj" },
  { userid: "sdasdklaskd", name: "asdsalkmdas" },
  { userid: "sadamsdlas", name: "asdklasmdkjo" },
  { userid: "sadlksldj", name: "dsakldajsadasksdskl" },
];

const mockChats = [
  {
    from: "a",
    content: "안녕하세요.",
    create_at: moment(1588752366000).format("YYYY-MM-DD hh:mm:ss"),
  },
  {
    from: "a",
    content: "궁금한점이 있어서요.\n혹시 환불을 어떻게 받나요?",
    create_at: moment(1588752370000).format("YYYY-MM-DD hh:mm:ss"),
  },
  {
    from: "b",
    content: "환불 안됩니다.",
    create_at: moment(1588752550000).format("YYYY-MM-DD hh:mm:ss"),
  },
  {
    from: "a",
    content: "안녕하세요.",
    create_at: moment(1588752366000).format("YYYY-MM-DD hh:mm:ss"),
  },
  {
    from: "a",
    content: "궁금한점이 있어서요.\n혹시 환불을 어떻게 받나요?",
    create_at: moment(1588752370000).format("YYYY-MM-DD hh:mm:ss"),
  },
  {
    from: "b",
    content: "환불 안됩니다.",
    create_at: moment(1588752550000).format("YYYY-MM-DD hh:mm:ss"),
  },
  {
    from: "a",
    content: "안녕하세요.",
    create_at: moment(1588752366000).format("YYYY-MM-DD hh:mm:ss"),
  },
  {
    from: "a",
    content: "궁금한점이 있어서요.\n혹시 환불을 어떻게 받나요?",
    create_at: moment(1588752370000).format("YYYY-MM-DD hh:mm:ss"),
  },
  {
    from: "b",
    content: "환불 안됩니다.",
    create_at: moment(1588752550000).format("YYYY-MM-DD hh:mm:ss"),
  },
  {
    from: "a",
    content: "안녕하세요.",
    create_at: moment(1588752366000).format("YYYY-MM-DD hh:mm:ss"),
  },
  {
    from: "a",
    content: "궁금한점이 있어서요.\n혹시 환불을 어떻게 받나요?",
    create_at: moment(1588752370000).format("YYYY-MM-DD hh:mm:ss"),
  },
  {
    from: "b",
    content: "환불 안됩니다.",
    create_at: moment(1588752550000).format("YYYY-MM-DD hh:mm:ss"),
  },
  {
    from: "a",
    content: "안녕하세요.",
    create_at: moment(1588752366000).format("YYYY-MM-DD hh:mm:ss"),
  },
  {
    from: "a",
    content: "궁금한점이 있어서요.\n혹시 환불을 어떻게 받나요?",
    create_at: moment(1588752370000).format("YYYY-MM-DD hh:mm:ss"),
  },
  {
    from: "b",
    content: "환불 안됩니다.",
    create_at: moment(1588752550000).format("YYYY-MM-DD hh:mm:ss"),
  },
  {
    from: "a",
    content: "안녕하세요.",
    create_at: moment(1588752366000).format("YYYY-MM-DD hh:mm:ss"),
  },
  {
    from: "a",
    content: "궁금한점이 있어서요.\n혹시 환불을 어떻게 받나요?",
    create_at: moment(1588752370000).format("YYYY-MM-DD hh:mm:ss"),
  },
  {
    from: "b",
    content: "환불 안됩니다.",
    create_at: moment(1588752550000).format("YYYY-MM-DD hh:mm:ss"),
  },
];

export default {
  layout: "defaultWithTitle",
  components: {
    AppInput,
    AppButton,
  },
  data() {
    return {
      follows: mockFollows,
      selected: "abcd0123",
      chats: mockChats,
    };
  },
  methods: {
    isActive(userid) {
      return this.selected === userid;
    },
    select(userid) {
      this.selected = userid;
    },
    getFloat(from) {
      if (from === "b")
        return "float-right text-right border px-2 py-2 rounded border-info mb-0";
      else return "float-left text-left border px-2 py-2 rounded mb-0";
    },
    getWhom(from) {
      if (from === "b")
        return "<div class='text-right px-1'><small>나</small></div>";
      else return "<div class='px-1'><small>상대</small></div>";
    },
  },
};
</script>
