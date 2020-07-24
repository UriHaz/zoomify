
<template>
<section>
  <div>
    <evento-filter @setFilter="setFilter()" />
  </div>
  <div>
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
