<template>

  <section class="home main-layout">      
      <div class="txt-vect-hero">
        <div class="centered-h1">
          <h1>
            Join Live Events
            <br />from Around the World
          </h1>
          <router-link to="/login" class="hp-btn">Share your Event ›</router-link>
        </div>
        <!-- <img src="../assets/imgs/hero2.mp4" class="home-vector" /> -->
        <img src="../assets/imgs/hero1.jpeg" class="home-vector" />
        <!-- <img src="../assets/imgs/home-vector.svg" class="home-vector" /> -->
      </div>

      <!-- <div class="hero-bg"> -->
      <!-- <img src="../assets\imgs\hero.jpg" class="hero" /> -->
      <!-- </div> -->


     <div>
                              <evento-filter/>

      </div>
      
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
        <el-carousel-item v-for="evento in eventos" :key="evento.id">
                    <evento-preview :evento="evento" />
        </el-carousel-item>
      </el-carousel>

      <el-carousel :interval="4000" type="card" height="500px">
        <el-carousel-item v-for="evento in eventos" :key="evento.id">
                    <evento-preview :evento="evento" />
        </el-carousel-item>
      </el-carousel>
    
    </section>
    
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
    }
  },
  created() {
    this.$store.dispatch({ type: "loadEventos" });
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








