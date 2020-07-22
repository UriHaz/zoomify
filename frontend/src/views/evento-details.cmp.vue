<template>
  <section v-if="evento" class="evento-details">
    <div class="evento-details-hiro flex align-center">
      <div class="evento-details-hiro-title">
        <h1 class="evento-details-h1">{{evento.title}}</h1>
        <h2 class="evento-details-h2">By {{evento.createdBy.fullName}}</h2>
        <h3 class="evento-details-h3">{{evento.tags}}</h3>
        <h4 class="evento-details-h4">Rating: 5</h4>
      </div>
      <div class="evento-details-hiro-img">
        <img src="../assets/imgs/Web-design-secrets.jpg" />
      </div>
    </div>
    <div class="evento-content flex">
      <div class="evento-desc">
        <p>
          <span>Starts at:</span>
          {{evento.startDate}} {{evento.startTime}}
        </p>
        <p>
          <span>Brodcast from:</span>
        </p>
        <p>
          <span>Language:</span>
        </p>
        <p>
          <span>Suitable for:</span>
        </p>
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
        <h3>About {{evento.createdBy.fullName}}</h3>
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
        <button v-if="!join" @click="joinEvent" class="join-btn">
          💛
          <br />Join event!
        </button>
        <form v-if="!loggedInUser" class="guest-sign">
          <p>
            <span>Full Name:</span>
            <input type="text" placeholder="Type your name" />
          </p>
          <p>
            <span>Email:</span>
            <input type="text" placeholder="Type your Email" />
          </p>
          <p>
            <span>Photo:</span>
            <input type="file" name id />
          </p>
          <button>Submit</button>
        </form>
        <h3>Members</h3>
        <div v-for="member in evento.members" :key="member.id">
          <p>{{member.fullName}}</p>
          <img :src="member.imgUrl" alt="Member" class="member-img" />
        </div>
      </div>
    </div>
  </section>
</template>


<script>
import { eventoService } from "../services/evento.service.js";

export default {
  name: "evento-details",
  data() {
    return {
      evento: null,
      loggedInUser: {},
      join: false
    };
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
      await this.$store.dispatch({ type: "addEventoToUser", evento: this.evento });
    }
  },

  created() {
    this.loadEvento();
  }
};
</script>