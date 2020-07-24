<template>
  <nav class="nav-bar">
    <!-- <router-link to="/" ><img class="app-logo" src="../assets/logo.png" alt=""></router-link> -->
    <!-- <router-link to="/" class="app-logo">z👀mify</router-link> -->
    <router-link to="/"> <img class="logo-img" src="../assets/imgs/eyes logo.png"/></router-link>
    <div class="nav-links">
      <!-- <router-link to="/"> Home </router-link> -->
      <router-link to="/events">Events</router-link>
      <router-link to="/event/edit">Create Event</router-link>
      <router-link to="/about">About</router-link>
      <router-link v-if="!loggedInUser" to="/login">Login</router-link>
      <!-- <button class="user-btn" v-else> <i class="fas fa-user"></i> {{loggedInUser.fullName}} </button> -->
      <avatar v-if="!loggedInUser.imgUrl" class="nav-user-img" :size="40" :username="loggedInUser.fullName"></avatar>
      <avatar v-else class="nav-user-img" :size="40" :src="loggedInUser.imgUrl"></avatar>
      <!-- <button class="btn-menu" @click="toggleMenu">☰</button> -->
    </div>
  </nav>
</template>


<script>
import Avatar from 'vue-avatar'
export default {
  name: "nav-bar",

  computed:{
  loggedInUser() {
    return this.$store.getters.loggedInUser;
    }
  },
  components: {
    Avatar
  }







}
</script>



