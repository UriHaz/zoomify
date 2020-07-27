
<template>
<section>

  <div class="details-hero">
    <h1 class="list-h1">All Events</h1>
    <!-- <h1 class="list-h1" </h1> -->
    <!-- <img src="../assets/imgs/hero-list.jpg" class="hero-list-img" /> -->
    <img src="../assets/imgs/list-cover.jpg" class="hero-list-img" />
    <!-- <img src="../assets/imgs/1.jpg" class="hero-list-img" /> -->
    <!-- <img src="../assets/imgs/2.jpg" class="hero-list-img" /> -->
    <!-- <img src="../assets/imgs/list-hero2.jpg" class="hero-list-img" /> -->
  

  <div class="list-filter">
    <evento-filter @setFilter="setFilter()" />
  </div>

  </div>

  <div class="evento-list">
    <evento-list v-if="!isLoading" :eventos="eventos" />
  </div>
</section>
</template>


<script>

import eventoList from '../components/evento-list.cmp';
import eventoFilter from '../components/evento-filter.cmp';

export default {
  name: 'evento-app',
  computed: {
    eventos() {
      return this.$store.getters.eventos
    },
    isLoading() {
      return this.$store.getters.isLoading
    }
  },
  methods: {
    setFilter(filterBy) {
            this.$store.commit({type: 'setFilter', filterBy: filterBy})
            this.$store.dispatch({type: 'loadEventos'})
        }
  },
  created() {
      this.$store.dispatch({ type: 'loadEventos' })
  },

  components: {
    eventoList,
    eventoFilter
  }
}

</script>
