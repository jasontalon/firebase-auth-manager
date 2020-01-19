<template>
  <div>
    <b-form-group
      id="input-group-password"
      label="Password"
      label-for="password"
      description=""
      :invalid-feedback="passwordFeedback"
      :state="!passwordFeedback"
    >
      <b-form-input
        id="password"
        v-model="password"
        type="password"
        required
        placeholder=""
        :state="!passwordFeedback"
      ></b-form-input>
    </b-form-group>
    <b-form-group
      id="input-group-repeatpassword"
      label="Confirm Password"
      label-for="repeatpassword"
      :invalid-feedback="repeatPasswordFeedback"
      :state="!repeatPasswordFeedback"
    >
      <b-form-input
        id="repeatpassword"
        v-model="repeatPassword"
        type="password"
        required
        placeholder=""
        :state="!repeatPasswordFeedback"
      ></b-form-input>
    </b-form-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      password: '',
      repeatPassword: ''
    }
  },
  watch: {
    password: function(val) {
      this.$emit('update:password', val)
    },
    feedback: function(val) {
      this.$emit('update:feedback', val)
    }
  },
  computed: {
    feedback() {
      return [this.repeatPasswordFeedback, this.passwordFeedback]
        .filter(p => p)
        .join(';')
    },
    isValid() {
      const isValid =
        [this.repeatPasswordFeedback, this.passwordFeedback].filter(p => p)
          .length == 0

      return isValid
    },
    repeatPasswordFeedback() {
      if (!this.repeatPassword) return 'Confirm password'
      return this.password === this.repeatPassword
        ? ''
        : 'Password does not match'
    },
    passwordFeedback() {
      if (!this.password) return 'Enter password'
      return this.password.length < 6 ? 'Enter at least 6 characters' : ''
    }
  }
}
</script>

<style></style>
