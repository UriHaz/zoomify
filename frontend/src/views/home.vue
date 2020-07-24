<template>

  <section class="home">      
      <div>
        <div class="centered-header">
          <h1 class="hp-h1">
            Join Live Events
            <br />from Around the World
          </h1>
     <div class="hp-link-filter">
         
          <router-link to="/login" class="hp-btn">Start Your Journey ›</router-link> 
          <evento-filter/>
      </div>

        </div>
        <!-- <img src="../assets/imgs/hero-gif3.gif" class="home-hero" /> -->
        <!-- <img src="../assets/imgs/hero-gif1.gif" class="home-hero" /> -->

        <!-- <img src="../assets/imgs/home-vector.svg" class="home-vector" /> -->
        <!-- <img src="../assets/imgs/hero2.mp4" class="home-vector" /> -->
      </div>
        <img src="../assets/imgs/hero2.jpeg" class="home-hero" />


<div class="hp-content">
      

      <nav class="sub-nav-bar">
        <router-link to="/" class="hp-sub-link-1">Recommended events:</router-link>
        <div class="hp-sub-link-2">
          <router-link to="/events">All events ›</router-link>

        </div>
      </nav>



        <!-- <div class="eventos-line" v-for="evento in technologyEventos" :key="evento.id">
          <evento-preview :evento="evento" />                 
        </div> -->

        <div class="eventos-line">
           <evento-list :eventos="popularEventos" />
        </div>
        <div class="eventos-line">
           <evento-list :eventos="technologyEventos" />
        </div>
        <!-- <div class="eventos-line">
           <evento-list v-if="!isLoading" :eventos="upcomingEventos" />
        </div> -->

 
    
    </div>
    </section>

     <!-- eventos.tags.includes('technology') -->
    
</template>

<script>
import eventoPreview from "../components/evento-preview.cmp";
import eventoList from "../components/evento-list.cmp";
import eventoFilter from "../components/evento-filter.cmp";

export default {
  name: "home",
  //   props: {
  //     eventos: {
  //         type: Array,
  //         required: true
  //     }
  // },

  computed: {
    eventos() {
      return this.$store.getters.eventos;
    },
      popularEventos() {
        return this.$store.getters.eventos.filter(evento => evento.createdBy.rating > 4.7)   
      },
    technologyEventos() {
      return this.$store.getters.eventos.filter(evento => evento.tags.find(tag => tag === "technology"))   
    },
    upcomingEventos() {
      return this.$store.getters.eventos.filter(evento => evento.startDate <= "2020-07-30")   
    }

  },
  created() {
    this.$store.dispatch({ type: "loadEventos"});
    // this.$store.getters.eventos;
  },
  // methods: {
  //     remove(id) {
  //         this.$emit('eventoRemoved', id);
  //     }
  // },
  components: {
    eventoList,
    eventoFilter,
    eventoPreview
  }
};
</script>








