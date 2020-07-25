<template>
  <section v-if="evento" class="evento-details main-layout">
   
   
    <div class="evento-details-hero">
        <div><img  :src="evento.imgUrls.img2" /></div>
        <div><img  :src="evento.imgUrl" /></div>
        <div><img  :src="evento.imgUrls.img1" /></div>
      </div>



    <div class="evento-content flex">

      <div class="top-desc">
        <div class="evento-details-title">
        <span v-for="tag in evento.tags" :key="tag" class="evento-tag">{{tag}} </span>
        <i class="far fa-star"></i> {{evento.createdBy.rating}} ({{evento.raters}})
        <h1 class="evento-details-h1">{{evento.title}}</h1>
        <h2 class="evento-details-h2">By {{evento.createdBy.fullName}}</h2> 
         
        
        <h4 class="evento-details-h4">
        <i class="fas fa-plane"></i>
          {{evento.country}}</h4>
      </div>
        
        <div class="evento-info flex space-between">
        <p>
          <i class="far fa-clock"></i>
          {{evento.dur}} Minutes
        </p>
        <p>
          <i class="fas fa-globe-europe"></i>
          {{evento.lang}}
        </p>
        <p>
          <i class="fas fa-desktop"></i>
          Join from your computer, phone, or tablet
        </p>
        <p>
          <i class="far fa-user"></i>
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
        <p>
          {{evento.desc}}
        </p>
        </div>
        <div class="about-creator" >
        <div class="about-creator-title flex align-center">
        <avatar :src="evento.createdBy.imgUrl"></avatar>
        <h3>
        Meet your host, {{evento.createdBy.fullName}}
        </h3>
        </div>

        <p>
          {{evento.about}}
        </p>
        </div>

        <h3>Reviews</h3>
    <div class="reviews">
        <div v-for="block in evento.reviews">
          <avatar :src="block.imgUrl"></avatar>
          <p class="review-title">
            {{block.givenRating}}
            <i class="fas fa-star">
              </i> {{block.fullName}}</p>
          <p>{{block.review}}</p>
        
        </div>
      </div>





        <h3>Related lectures</h3>
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
        <button v-if="!join" @click="open" class="join-btn">
          Book Event (${{evento.price}})
        </button>
        <div class="evento-start" v-else>
        <h3>Event starts in:</h3> <i> {{countDownMinutes}}:<i v-if="(countDownSeconds < 10)">0</i>{{countDownSeconds}} Minutes</i>
        <button class="join-btn">
          Start event!
        </button>
        </div>
       
        <h3>Members</h3>
        <div class="members-container">
        <div class="evento-members" v-for="member in evento.members" :key="member.id">
        <el-tooltip  content='member' placement="top-start" effect="dark">
          <avatar v-if="!member.imgUrl" :username="member.fullName"></avatar>
          <avatar v-else :src="member.imgUrl"></avatar>
        </el-tooltip>
         </div>

        </div>
      </div>
    </div>
  </section>
</template>


<script>
import { eventoService } from "../services/evento.service.js";
import Avatar from 'vue-avatar'


export default {
  name: "evento-details",
  data() {
    return {
      evento: null,
      join: false,
      guestToAdd:{},
      countDownSeconds : 59,
      countDownMinutes : 55
    };
  },

  computed:{
  loggedInUser() {
    return this.$store.getters.loggedInUser;
    },
    timerOn(){
     return this.timer = setInterval( this.timeDown(), 1000);
    //  return this.time;
    }
  },

  methods: {

    countDownTimer() {
        if(this.countDownSeconds >= 0 && this.countDownMinutes >= 0) {
            setTimeout(() => {
            this.countDownSeconds --
            this.countDownTimer()
            }, 1000)
        }
        else {
          this.countDownSeconds = 59
          this.countDownTimer()
          this.countDownMinutes--
          
        }
    },

     open() {
        this.$confirm(`Your acoount will be charged by $${this.evento.price}`,'Book', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
        }).then(() => {
          this.$message({
            type: 'success',
            message: 'Book completed!'
          });
          this.joinEvent()
          this.countDownTimer()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Book was cancelled'
          });          
        });
     },
    async loadEvento() {
      const eventoId = this.$route.params._id;
      const evento = await eventoService.getById(eventoId)
        this.evento = evento;
    },
    async joinEvent() {
      this.join = true;
      if (this.loggedInUser){
      this.evento.members.push(this.loggedInUser)
      // await this.$store.dispatch({ type: "addEventoToUser", evento: this.evento })
      }
      else {
        this.evento.members.push(this.guestToAdd)
      }
      this.$store.dispatch({ type: "saveEvento", evento: this.evento });
    }
  },
  created() {
    this.loadEvento();
  },
  components: {
    Avatar
  },
}
</script>