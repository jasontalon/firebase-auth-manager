<template>
  <div class="mx-auto" style="max-width:450px">
    <b-form>
      <b-form-group id="input-group-name" label="Name:" label-for="name">
        <b-form-input
          id="name"
          v-model="name"
          type="text"
          required
          placeholder="Enter name"
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="input-group-email"
        label="Email address:"
        label-for="email"
      >
        <b-form-input
          id="email"
          v-model="email"
          type="email"
          required
          placeholder="Enter email"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-password"
        label="password:"
        label-for="password"
        description=""
      >
        <b-form-input
          id="password"
          v-model="password"
          type="password"
          required
          placeholder=""
        ></b-form-input>
      </b-form-group>
      <b-button block variant="primary" v-on:click="onSubmit">Submit</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      email: '',
      password: ''
    }
  },
  mounted() {},
  methods: {
    async onSubmit() {
      try {
        await this.$firebase
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password)

        const displayName = this.name
        const user = this.$firebase.auth().currentUser
        await user.updateProfile({ displayName })
        const { email, uid } = user

        this.$store.commit('auth/setCurrentUser', { email, uid, displayName })

        this.$router.push('/?signedUp')
      } catch (error) {
        throw error
      }
    }
  }
}
</script>

<style></style>
