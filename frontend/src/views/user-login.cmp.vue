<template>
     <div class="login-page">
    <div>
      <h2> Login </h2>
    <form class="flex column" @submit.prevent="doLogin">
      <input type="text" v-model="loginCred.email" placeholder="Email">
      <input type="text" v-model="loginCred.password" placeholder="Password">
      <button> Login </button>
    </form>
      <h2> Signup </h2>
    <form class="flex column" @submit.prevent="doSignup">
      <input type="text" v-model="signupCred.fullName" placeholder="Full name">
      <input type="text" v-model="signupCred.email" placeholder="Email">
      <input type="text" v-model="signupCred.password" placeholder="Password">
      <button> Signup </button>
    </form>
    </div>
  </div>

</template>

<script>
import { userService } from "../services/user.service.js";

export default {
  name: 'login-page',
  data() {
    return {
      loginCred: {
        email: 'john@doe.com',
        password: 'rocair'
      },
      signupCred: null,
      msg: '',
      userToEdit: {}
    }
  },
  computed: {
    users() {
      return this.$store.getters.users
    },
    loggedInUser() {
      return this.$store.getters.loggedInUser

    }
  },
  created() {

    console.log('this.loggedInUser', this.loggedInUser)
  },
  methods: {
    async doLogin() {
      const cred = this.loginCred
      if(!cred.email || !cred.password) return this.msg = 'Please enter user/password'
      await this.$store.dispatch({type :'login', userCred:cred})
      this.loginCred = {};
      
    },   
    doSignup() {
      this.$store.dispatch({type: 'signup', user: this.signupCred})
      this.signupCred = userService.getEmptyuser();
    },
    getAllUsers() {
      this.$store.dispatch({type: 'loadUsers'})
    },
    removeUser(userId) {
      this.$store.dispatch({type: 'removeUser', userId})
    },
    updateUser() {
      this.$store.dispatch({type: 'updateUser', user: this.userToEdit})
    },
  },
  components: {
    
  },
  watch : {
    loggedInUser() {
      this.userToEdit = {...this.loggedInUser}
    }
  },
  created() {
    // this.signupCred = userService.getEmptyuser();
  }  
}
</script>