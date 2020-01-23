<template>
  <div class="mx-auto" style="max-width:450px">
    <b-alert show variant="danger" v-show="this.message">{{
      this.message
    }}</b-alert>
    <b-form>
      <b-form-group
        id="input-group-1"
        label="Email address:"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="email"
          type="email"
          required
          placeholder="Enter email"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-2"
        label="password:"
        label-for="input-2"
        description=""
      >
        <b-form-input
          id="input-2"
          v-model="password"
          type="password"
          required
          placeholder=""
        ></b-form-input>
      </b-form-group>
      <b-button block variant="primary" v-on:click="onSignIn">Submit</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      message: ''
    }
  },
  mounted() {},
  methods: {
    async onSignIn() {
      try {
        const { user } = await this.$firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password)

        const parsedToken = await user.getIdTokenResult()
        const isAdmin = parsedToken.claims.admin

        if (!isAdmin) {
          this.message = 'Only users with admin claims can sign in.'
          await this.$firebase.auth().signOut()
          this.$store.commit('auth/setCurrentUser', null)
          return
        }

        this.$store.dispatch('auth/findCurrentUser')
        this.$router.push('/?signedIn')
      } catch (error) {
        console.log(error)
        this.message = error.message || ''
      }
    }
  }
}
</script>

<style></style>
