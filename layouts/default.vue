<template>
  <div>
    <template v-if="this.authServiceStarted">
      <b-navbar toggleable="md" type="dark" variant="info">
        <b-navbar-brand to="/">NavBar</b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item to="/user">Users</b-nav-item></b-navbar-nav
          >

          <b-navbar-nav class="ml-auto">
            <b-navbar-nav>
              <template v-if="!!!this.currentUser">
                <b-nav-item to="/signup">Sign Up</b-nav-item>
                <b-nav-item to="/signin">Sign In</b-nav-item>
              </template>
              <b-nav-item v-on:click="signout" v-show="!!this.currentUser"
                >Sign Out</b-nav-item
              >
            </b-navbar-nav>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
      <div class="container-fluid">
        <nuxt class="pt-3" />
      </div>
    </template>
    <template v-else>
      <h1>Loading...</h1>
    </template>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      currentUser: state => state.auth.currentUser,
      authServiceStarted: state => state.auth.serviceStarted
    })
  },
  methods: {
    async signout() {
      await this.$firebase.auth().signOut()
      this.$store.commit('auth/setCurrentUser', null)
      this.$router.push('/?signedOut')
    }
  }
}
</script>
