<template>
  <section>
    <h3>Chat</h3>
    <div class="chat-body">
      <div class="chat-header">
        <p
          v-if="isTyping"
          v-show="(msg.from !== loggedInUser.fullName)"
          class="typing"
        >{{msg.from}} is typing...</p>
        <p v-else> Online </p>
      </div>
      <ul>
        <li v-for="(msg, idx) in msgs" :key="idx">{{msg.from}}: {{msg.txt}}</li>
      </ul>

      <form class="chat-input" @submit.prevent="sendMsg">
        <input @input="userTyping" type="text" v-model="msg.txt" placeholder="Type your massege" />
        <button>Send</button>
      </form>
    </div>
  </section>
</template>


<script>
import { eventoService } from "../services/evento.service.js";
import socketService from "../services/socket.service.js";

export default {
  name: "evento-chat",
  data() {
    return {
      evento: null,
      msg: { from: "Me", txt: "" },
      msgs: [],
      txt: "is typing...",
      isTyping: false,
      whoType: "",
    };
  },

  computed: {
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    },
  },

  methods: {
    stopTyping() {
      this.isTyping = false;
    },
    addMsg(msg) {
      this.msgs.push(msg);
    },
    sendMsg() {
      socketService.emit("chat newMsg", this.msg);
      this.msg = { from: "Me", txt: "" };
    },

    showUserTyping(msg) {
      this.msg.from = this.$store.getters.loggedInUser.fullName;
      this.isTyping = true;

      setTimeout(this.stopTyping, 2000);
    },
    userTyping(msg) {
      socketService.emit("typing user", this.msg);
    },
  },

  created() {
    socketService.setup();
    socketService.on("chat addMsg", this.addMsg);
    socketService.on("show Typing", this.showUserTyping);
  },
  destroyed() {
    socketService.off("chat addMsg", this.addMsg);
    socketService.terminate();
  },
};
</script>