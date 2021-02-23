<template>
  <nav> 
    <div class="nav-wrapper green">
        <div class="container">
            <div>
              <router-link to="/" class="brand-logo">Employee Manager</router-link>
            </div>
            <ul class="right">
                <li v-if="isLoggedIn">{{currentUser}}</li>
                <li v-if="isLoggedIn"><router-link to="/">Dashboard</router-link></li>
                <li v-if="!isLoggedIn"><router-link to="/signup">Sign Up</router-link></li>
                <li v-if="!isLoggedIn"><router-link to="/login">Login</router-link></li>
                <li v-if="isLoggedIn"><button class="btn red" @click.prevent="logout">Logout</button></li>
            </ul>
            
        </div>
    </div>
  </nav>
</template>
<script>
import firebase from 'firebase'
export default {
  name: "navbar",
  data() {
    return {
      isLoggedIn: false,
      currentUser: false
    }
  },
  created() {
    if(firebase.auth().currentUser) {
      this.isLoggedIn = true;
      this.currentUser = firebase.auth().currentUser.email;
    }
  },
  methods: {
    logout() {
      firebase.auth().signOut().then(() => this.$router.go({path: this.$router.path}))
    }
  }
}
</script>