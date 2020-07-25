<template>
  <section v-if="evento" class="evento-details main-layout">
    <div class="evento-details-hero">
      <div>
        <img :src="evento.imgUrls.img2" />
      </div>
      <div>
        <img :src="evento.imgUrl" />
      </div>
      <div>
        <img :src="evento.imgUrls.img1" />
      </div>
    </div>

    <div class="evento-content flex">
      <div class="top-desc">
        <div class="evento-details-title">
          <span v-for="tag in evento.tags" :key="tag" class="evento-tag">{{tag}}</span>
          <i class="far fa-star"></i>
          {{evento.createdBy.rating}} ({{evento.raters}})
          <h1 class="evento-details-h1">{{evento.title}}</h1>
          <h2 class="evento-details-h2">By {{evento.createdBy.fullName}}</h2>

          <h4 class="evento-details-h4">
            <i class="fas fa-map-marker-alt"></i>
            {{evento.country}}
          </h4>
        </div>

        <div class="evento-info flex space-between">
          <p>
            <i class="far fa-clock"></i>
            {{evento.dur}} Minutes
          </p>
          <p>
            <i class="fas fa-globe-americas"></i>
            {{evento.lang}}
          </p>
          <p>
            <i class="fas fa-desktop"></i>
            Join from your computer, phone, or tablet
          </p>
          <p>
            <i class="fas fa-users"></i>
            Up to {{evento.capacity}} pepole
          </p>
          <p>
            <i class="far fa-calendar-alt"></i>
            {{evento.startDate}} {{evento.startTime}}
          </p>
          <p>
            <i class="fas fa-tag"></i>
            ${{evento.price}}
          </p>
        </div>
        <div class="evento-description">
          <h3>Agenda of event</h3>
          <p>{{evento.desc}}</p>
        </div>
        <div class="about-creator">
          <div class="about-creator-title flex align-center">
            <avatar :src="evento.createdBy.imgUrl"></avatar>
            <h3>Meet your host, {{evento.createdBy.fullName}}</h3>
          </div>

          <p>{{evento.about}}</p>
        </div>

        <h3>Reviews</h3>
        <div class="reviews">
          <div v-for="review in evento.reviews" :key="review.id">
            <avatar :src="review.imgUrl"></avatar>
            <p class="review-title">
              {{review.givenRating}}
              <i class="fas fa-star"></i>
              {{review.fullName}}
            </p>
            <p>{{review.txt}}</p>
          </div>
        </div>

        <h3>Related lectures</h3>
        <div class="eventos-line">
          <evento-list :eventos="relatedEventos" />
        </div>
      </div>
      <div class="evento-join">
        <form @submit.prevent="addGuest" v-if="!loggedInUser" class="guest-sign">
          <p>
            <input v-model="guestToAdd.fullName" type="text" placeholder="Type your name" />
          </p>
          <p>
            <input v-model="guestToAdd.email" type="text" placeholder="Type your Email" />
          </p>
        </form>
        <button v-if="!join" @click="open" class="join-btn">Book Event</button>
        <div class="evento-start" v-else>
          <div class="evento-start-txt">
            <h3>Event starts in:</h3>
            <i>
              {{countDownMinutes}}:
              <i v-if="(countDownSeconds < 10)">0</i>
              {{countDownSeconds}} Minutes
            </i>
          </div>
          <button class="join-btn">Start event!</button>
        <h3 >Event starts in:</h3> <i> {{countDownMinutes}}:<i v-if="(countDownSeconds < 10)">0</i>{{countDownSeconds}} Minutes</i>
       </div>
<button type="text" @click="modal" class="join-btn">Start event!</button>
        

        <h3>Event Members</h3>
        <div class="members-container">
          <div class="evento-members" v-for="member in evento.members" :key="member.id">
            <el-tooltip :content="member.fullName" placement="top-start" effect="dark">
              <avatar v-if="!member.imgUrl" :username="member.fullName"></avatar>
              <avatar v-else :src="member.imgUrl"></avatar>
            </el-tooltip>
          </div>
        </div>

        <h3>Chat</h3>
        <div class="chat-body" v-if="join">
          <div class="chat-header">
            <p v-if="isTyping" v-show="(msg.from === loggedInUser.fullName)" class="typing">{{whoType}} is typing...</p>
            </div>
          <ul>
            <li v-for="msg in msgs" :key="msg.sentAt"><span>{{msg.from}}:</span> {{msg.txt}} {{msg.sentAt}}</li>
                
          </ul>

          <form class="chat-input" @submit.prevent="sendMsg">
            <input
              @input="userIsTyping"
              type="text"
              v-model="msg.txt"
              placeholder="Type your massege"
            />
            <button>Send</button>
          </form>
        </div>
      </div>
    </div>
    
  </section>
</template>




<script>
import { eventoService } from "../services/evento.service.js";
import Avatar from "vue-avatar";
import socketService from "../services/socket.service.js";
import eventoList from "../components/evento-list.cmp";

export default {
  name: "evento-details",
  data() {
    return {
      evento: null,
      join: false,
      guestToAdd: {},
      countDownSeconds: 59,
      countDownMinutes: 55,
      topic: "Love",
      msg: { from: "Me", txt: "", sentAt: "" },
      msgs: [],
      isTyping: false,
      whoType: "",
    };
  },

  computed: {
    relatedEventos() {
      return this.$store.getters.eventos.filter((evento) =>
        evento.tags.find((tag) => tag === "related")
      );
    },
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    },
    timerOn() {
      return (this.timer = setInterval(this.timeDown(), 1000));
    },
  },

  methods: {

modal() {
        this.$alert('<iframe width="390" height="200" src="https://www.youtube.com/embed/ncXwjkm563w?controls=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>', 'The event will start soon...', {
          dangerouslyUseHTMLString: true
        });
      },

    countDownTimer() {
      if (this.countDownSeconds >= 0 && this.countDownMinutes >= 0) {
        setTimeout(() => {
          this.countDownSeconds--;
          this.countDownTimer();
        }, 1000);
      } else {
        this.countDownSeconds = 59;
        this.countDownTimer();
        this.countDownMinutes--;
      }
    },

    open() {
      this.$confirm(
        `You will join the event \"${this.evento.title}\", continue?`,
        "Book",
        {
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
        }
      )
        .then(() => {
          this.$message({
            type: "success",
            message: "Book completed!",
          });
          this.joinEvent();
          this.countDownTimer();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Book was cancelled",
          });
        });
    },
    async loadEvento() {
      const eventoId = this.$route.params._id;
      const evento = await eventoService.getById(eventoId);
      this.evento = evento;
    },

    toggleTyping() {
      this.isTyping = false;
    },
    async joinEvent() {
      this.join = true;
      if (this.loggedInUser) {
        this.evento.members.push(this.loggedInUser);
        // await this.$store.dispatch({ type: "addEventoToUser", evento: this.evento })
      } else {
        this.evento.members.push(this.guestToAdd);
      }
      this.$store.dispatch({ type: "saveEvento", evento: this.evento });
    },
    addMsg(msg) {
      console.log("msg in addMsg", msg);
      this.msgs.push(msg);
    },
    sendMsg() {
      console.log("Sending", this.msg);
      this.msg.sentAt = Date.now();
      socketService.emit("chat newMsg", this.msg);
      this.msg.txt = "";
    },

    userIsTyping() {
      console.log("userIsTyping", this.msg.from, this.msg.txt);
      console.log(socketService);
      socketService.emit("typing user", this.msg);
    },
    showTypeingAndUser(msg) {
      console.log("userName and in frontend in Chat Page:", msg.from);
      if (msg.txt) {
        this.isTyping = true;
        this.whoType = msg.from;
        setTimeout(this.toggleTyping, 2000);
      } else this.isTyping = false;
    },
  },
  // watch: {
  //   "msg.txt"() {
  //     console.log('msg in watch', this.msg.from, this.msg.txt);
  //     socketService.emit("typing user", {fullName: this.msg.from, txt: this.msg.txt});
  //     console.log('watch was ended');
  //   }
  // },
  created() {
    this.loadEvento();
    this.msg.from = this.$store.getters.loggedInUser.fullName;
    socketService.setup();
    socketService.on("show Typing", this.showTypeingAndUser);
    socketService.on("chat addMsg", this.addMsg);
  },
  destroyed() {
    socketService.off("chat addMsg", this.addMsg);
    socketService.terminate();
    this.$store.dispatch({ type: "loadEventos" });
  },
  updated() {
    // this.msg.from = this.$store.getters.loggedInUser.fullName;
  },

  components: {
    Avatar,
    eventoList,
  },
};
</script>