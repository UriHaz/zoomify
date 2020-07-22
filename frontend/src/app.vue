<template>
  <div id="app" class="app">
    <nav-bar />
    <router-view />
  </div>
</template>

<script>

import navBar from './components/nav-bar.cmp.vue';

export default {
  name: "app",
  components: {
    navBar,
  }
};
</script>



