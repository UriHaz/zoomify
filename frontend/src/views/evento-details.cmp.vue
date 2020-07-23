<template>
  <section v-if="evento" class="evento-details">
    <div class="evento-details-hiro flex align-center">
      <div class="evento-details-hiro-img">
        <img class="hiro-img" src="../assets/imgs/Web-design-secrets.jpg" />
      </div>
    </div>


    <div class="evento-content flex">

      <div class="evento-desc">
        <span v-for="tag in evento.tags" :key="tag" class="evento-details-h3">{{tag}} </span>
        <div class="evento-details-title">
        <h1 class="evento-details-h1">{{evento.title}}</h1>
        <h2 class="evento-details-h2">By {{evento.createdBy.fullName}}</h2> 
         
        
        <h4 class="evento-details-h4"><i class="far fa-star"></i> {{evento.createdBy.rating}} ({{evento.createdBy.raters}})</h4>
      </div>
        
        <div class="evento-info flex space-between">
        <p>
          <i class="far fa-flag"></i>
          {{evento.country}}
        </p>
        <p>
          <i class="fas fa-language"></i>
          {{evento.lang}}
        </p>
        <p>
          <i class="far fa-clock"></i>
          {{evento.dur}} Minutes
        </p>
        <p>
          <i class="fas fa-users"></i>
          Up to {{evento.capacity}} pepole
          
        </p>
        </div>
        <h2 class="evento-description">Description</h2>
        <p>
          {{evento.desc}}
          <br />Lorem ipsum dolor sit amet consectetur,
          adipisicing elit. Illum quas facere omnis,
          numquam unde, aspernatur assumenda accusantium labore consequatur repellendus cumque voluptatum!
          Tempora modi reprehenderit delectus nisi magnam vero molestiae!
          Lorem ipsum dolor sit amet consectetur,
          adipisicing elit. Illum quas facere omnis,
          numquam unde, aspernatur assumenda accusantium labore consequatur repellendus cumque voluptatum!
          Tempora modi reprehenderit delectus nisi magnam vero molestiae!
        </p>
        <h3>Meet your host, {{evento.createdBy.fullName}}</h3>
        <avatar :src="evento.createdBy.imgUrl"></avatar>
        
        <p>
          {{evento.about}}
          <br />Lorem ipsum dolor sit amet consectetur,
          adipisicing elit. Illum quas facere omnis,
          numquam unde, aspernatur assumenda accusantium labore consequatur repellendus cumque voluptatum!
          Tempora modi reprehenderit delectus nisi magnam vero molestiae!
        </p>
        <h3>Reviews</h3>

        <h3>Related lectures</h3>
      </div>
      <div class="evento-join">
        <p>
          <i class="far fa-calendar-alt"></i>
          {{evento.startDate}} {{evento.startTime}}
        </p>
        <button v-if="!join" @click="joinEvent" class="join-btn">
          Join Event
        </button>
        <div v-else>
        <h3>Event start in: 55 minutes</h3>
        <button class="join-btn">
          Start event!
        </button>
        </div>
        <form @submit.prevent="addGuest" v-if="!loggedInUser" class="guest-sign">
          <p>
            <input v-model="guestToAdd.fullName" type="text" placeholder="Type your name" />
          </p>
          <p>
            <input v-model="guestToAdd.email" type="text" placeholder="Type your Email" />
          </p>
          <button>Submit</button>
        </form>
        <h3>Members</h3>
        <div class="evento-members" v-for="member in evento.members" :key="member.id">
          <avatar v-if="!member.imgUrl" :username="member.fullName"></avatar>
          <avatar v-else :src="member.imgUrl"></avatar>
         
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
      guestToAdd:{}
    };
  },

  computed:{
  loggedInUser() {return this.$store.getters.loggedInUser;}
  },

  methods: {
    loadEvento() {
      const eventoId = this.$route.params._id;
      eventoService.getById(eventoId).then(evento => {
        this.evento = evento;
      });
    },
    async joinEvent() {
      this.join = true;
      await this.$store.dispatch({ type: "addMember", evento: this.evento });
      // await this.$store.dispatch({ type: "addEventoToUser", evento: this.evento });
    },

    addGuest(){
      this.join = true;
      this.evento.members.push(this.guestToAdd)
      console.log(this.evento);
      this.$store.dispatch({ type: "saveEvento", evento: this.evento });
    }
  },

  created() {
    this.loadEvento();
  },
  components: {
    Avatar

  },
};
</script>