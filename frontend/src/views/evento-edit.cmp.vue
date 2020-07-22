
<template>
   <section class="evento-edit">

    <h1>{{ (eventoToEdit._id) ? 'Edit' : 'Add New' }} Event</h1>
    <h2>We will share it with others</h2>
    <form class="flex column" v-if="eventoToEdit" @submit.prevent="saveEvento">
      <label>
        <h3>My event is about...</h3>
        <input class="add-event-placeholder" type="text" v-model="eventoToEdit.title" placeholder="Add event title..." />
      </label>
      <label>
        <h3>Date! Be ready on...</h3>
        <!-- <input class="add-event-placeholder" type="date" v-model="eventoToEdit.startDate" placeholder="Event start date..." /> -->
        <input class="add-event-placeholder" type="date" v-model="eventoToEdit.startDate" />
      </label>
      <label>
        <h3>Time! Starting exactly at...</h3>
        <input class="add-event-placeholder" type="time" v-model="eventoToEdit.startTime" />
      </label>

      <label>
        <h3>Event Description:</h3>
        <input class="add-event-placeholder add-desc-placeholder" type="text" v-model="eventoToEdit.desc" placeholder="Add event description..." />
      </label>

     <label>
        <h3>About the Host:</h3>
        <input class="add-event-placeholder add-desc-placeholder" type="text" v-model="eventoToEdit.about" placeholder="Add some abouts..." />
      </label>

<div>
    <button class="back-btn" title="Back" @click="$router.push('/events')">◄ Back to Events ↶</button>
      <button  class="add-btn">⭞ Add Event ►</button>
</div>    
    </form>
    <button v-if="eventoToEdit.id" @click="removeEvento">Delete</button>
   </section>
</template>
<script>
import { eventoService } from "../services/evento.service.js";
const _ = require("lodash");

export default {
  name: "evento-edit",
  data() {
    return {
      eventoToEdit: null
    };
  },
  
  methods: {
    loadEvento() {
      const eventoId = this.$route.params.id;
      if (eventoId) {
        eventoService.getById(eventoId).then(evento => {
          this.eventoToEdit = _.cloneDeep(evento);
        });
      } else this.eventoToEdit = eventoService.getEmptyEvento();
    },
    saveEvento() {
      const loggedInUser = this.$store.getters.loggedInUser;
      this.eventoToEdit.createdBy = loggedInUser;
      this.$store
        .dispatch({ type: "saveEvento", evento: this.eventoToEdit })
        .then(evento => {
          this.$router.push("/events");
        });
    },
    removeEvento(){
      console.log('removing...');
      this.$store.dispatch({ type: 'removeEvento',id: this.eventoToEdit.id})
      .then((savedEvento)=>{
                this.$router.push('/');
    })
    }
  },
  watch: {
    "$route.params.id"() {
      this.loadEvento();
    }
  },
  created() {
    this.loadEvento();
  }
};
</script>

