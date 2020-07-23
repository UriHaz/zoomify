<template>
     <div class="login-page main-layout">
    
      <h2>{{msg}}</h2>

      <div v-if="loggedInUser">
      <h3>
        Loggedin User:
        {{loggedInUser.fullName}}
        <form @submit.prevent="updateUser">
          <input type="text" v-model="userToEdit.fullName" />
        </form>
        <button @click="doLogout">Logout</button>
      </h3>
    </div>

    <div v-else>
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
      signupCred: {},
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
    
  },
  methods: {
    async doLogin() {
      const cred = this.loginCred
      if(!cred.email || !cred.password) return this.msg = 'Please enter user/password'
      await this.$store.dispatch({type :'login', userCred: this.loginCred})
      this.loginCred = {};
      
    },   
    doSignup() {
      const cred = this.signupCred
      if (!cred.email || !cred.password || !cred.fullName)
        return (this.msg = "Please fill up the form");
      this.$store.dispatch({type: 'signup', userCred: this.signupCred})
      this.signupCred = {}
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
    doLogout() {
      this.$store.dispatch({ type: "logout" });
    },
  },
  computed:{
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    }
},
  watch : {
    loggedInUser() {
      this.userToEdit = {...this.loggedInUser}
    }
  },
  created() {
    this.loggedInUser
    console.log("this.loggedinUser", this.loggedInUser);
  }  
}
</script>