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
            :key="follow.room_id"
            button
            :active="isActive(follow.room_id)"
            @click="select(follow.room_id)"
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
          <b-row style="height: 560px; overflow-y: auto" ref="chat-box">
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
                @input="onInput"
              />
            </b-col>
            <b-col class="px-0" cols="2">
              <app-button
                type="button"
                variant="outline-dark"
                icon="arrow-return-right"
                buttonClass="rounded-0"
                @click="send"
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

export default {
  layout: "defaultWithTitle",
  components: {
    AppInput,
    AppButton,
  },
  data() {
    return {
      follows: [],
      selected: "",
      chats: [],
      you: "",
      content: "",
    };
  },
  methods: {
    onInput(m) {
      this.content = m;
    },
    async send() {
      try {
        const index = this.follows.findIndex(
          (v) => v.room_id === this.selected
        );

        await this.$axios.post(`/api/rooms/${this.selected}`, {
          content: this.content,
        });

        const resposne = await this.$axios.get("/api/rooms");
        this.follows = resposne.data;
        this.select(this.follows[index].room_id);
        this.scrollDown();
      } catch (e) {
        console.log(e);
        alert("메세지 전송 실패!");
      }
    },
    isActive(room_id) {
      return this.selected === room_id;
    },
    async select(room_id) {
      this.content = "";
      this.selected = room_id;

      const response = await this.$axios.get(`/api/rooms/${room_id}`);
      const { you, room } = response.data;

      this.you = you;
      this.chats = JSON.parse(room.messages);
    },
    getFloat(from) {
      if (from === this.you)
        return "float-right text-right border px-2 py-2 rounded border-info mb-0";
      else return "float-left text-left border px-2 py-2 rounded mb-0";
    },
    getWhom(from) {
      if (from === this.you)
        return "<div class='text-right px-1'><small>나</small></div>";
      else return "<div class='px-1'><small>상대</small></div>";
    },
    scrollDown() {
      this.$refs["chat-box"].scrollTop = this.$refs["chat-box"].scrollHeight;
    },
  },
  async mounted() {
    const resposne = await this.$axios.get("/api/rooms");
    this.follows = resposne.data;
    this.select(this.follows[0].room_id);
    this.scrollDown();
  },
};
</script>
