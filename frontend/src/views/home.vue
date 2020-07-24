<template>

  <section class="home">      
      <div>
        <div class="centered-header">
          <h1 class="hp-h1">
            Join Live Events
            <br />from Around the World
          </h1>
     <div class="hp-link-filter">
         
          <router-link to="/login" class="hp-btn">Share your Event ›</router-link> 
          <evento-filter/>
      </div>

        </div>
        <img src="../assets/imgs/hero-gif4.gif" class="home-hero" />
        <!-- <img src="../assets/imgs/hero-gif3.gif" class="home-hero" /> -->
        <!-- <img src="../assets/imgs/hero-gif1.gif" class="home-hero" /> -->

        <!-- <img src="../assets/imgs/home-vector.svg" class="home-vector" /> -->
        <!-- <img src="../assets/imgs/hero2.mp4" class="home-vector" /> -->
      </div>


<div class="hp-content">
      

      <nav class="sub-nav-bar">
        <router-link to="/" class="hp-sub-link-1">Recommended events:</router-link>
        <div class="hp-sub-link-2">
          <router-link to="/events">All events ›</router-link>

        </div>
      </nav>
   <!-- <div >
      <div class="list-container" v-for="evento in eventos" :key="evento.id">
          <evento-preview :evento="evento" />
      </div>
  </div> -->


      <el-carousel :interval="4000" type="card" height="500px">
        <el-carousel-item v-for="evento in technologyEventos" :key="evento.id">
          <evento-preview :evento="evento" />                 
        </el-carousel-item>
      </el-carousel>

      <el-carousel :interval="4000" type="card" height="500px">
        <el-carousel-item v-for="evento in upcomingEventos" :key="evento.id">
          <evento-preview :evento="evento" />                 
        </el-carousel-item>
      </el-carousel>

      <el-carousel :interval="4000" type="card" height="500px">
        <el-carousel-item v-for="evento in popularEventos" :key="evento.id">
          <evento-preview :evento="evento" />
        </el-carousel-item>
      </el-carousel>
    
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
        return this.$store.getters.eventos.filter(evento => evento.createdBy.rating > 4)   
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








