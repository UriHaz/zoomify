<template>

  <section class="home">      
      <div>
        <div class="centered-header">
          <h1 class="hp-h1">
            Join Live Events
            <br />from Around the World
          </h1>
     <div class="hp-link-filter">
         
          <router-link to="/events" class="hp-btn">Explore › › ›</router-link> 
      </div>

        </div>

        <img src="../assets/imgs/hp-hero5.gif" class="home-hero" />
        <!-- <img src="../assets/imgs/hero-gif3.gif" class="home-hero" /> -->
        <!-- <img src="../assets/imgs/hero-gif1.gif" class="home-hero" /> -->
        <!-- <img src="../assets/imgs/home-vector.svg" class="home-vector" /> -->
      </div>
        <!-- <img src="../assets/imgs/hero2.jpeg" class="home-hero" /> -->


  <section class="hp-content">
    <div >
      
        <div class="eventos-line">
        <h3>Popular events <router-link to="/events">/ Show all events</router-link></h3>
           <evento-list :eventos="popularEventos" />
        </div>
        <div class="eventos-line">
        <h3> Technologic events <router-link to="/events">/ Show all events</router-link></h3>
           <evento-list :eventos="technologyEventos" />
        </div>
        <div class="eventos-line">
        <h3>Upcoming events <router-link to="/events">/ Show all events</router-link></h3>
           <evento-list :eventos="upcomingEventos" />
        </div>

    </div>
  </section>
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
      return this.$store.getters.eventos.filter(evento => evento.avgRating > 4.8).slice(0,4)  
    },
    technologyEventos() {
      return this.$store.getters.eventos.filter(evento => evento.tags.find(tag => tag === "technology")).slice(0,4)     
    },
    upcomingEventos() {
      return this.$store.getters.eventos.filter(evento => evento.startDate <= "2020-07-30").slice(0,4)  
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








