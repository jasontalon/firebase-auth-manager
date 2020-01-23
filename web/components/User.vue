<template>
  <div class="mx-auto" style="max-width:450px">
    <b-form>
      <b-form-group
        id="input-group-name"
        label="Name"
        label-for="name"
        :state="!displayNameFeedback"
        :invalid-feedback="displayNameFeedback"
      >
        <b-form-input
          id="name"
          v-model="user.displayName"
          type="text"
          required
          placeholder="Enter name"
          :state="!displayNameFeedback"
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="input-group-email"
        label="Email"
        label-for="email"
        :state="!emailFeedback"
        :invalid-feedback="emailFeedback"
      >
        <b-form-input
          id="email"
          v-model="user.email"
          type="email"
          required
          placeholder="Enter email"
          :state="!emailFeedback"
        ></b-form-input>
      </b-form-group>
      <template v-if="isNewUser">
        <password
          :password.sync="user.password"
          :feedback.sync="password.feedback"
        ></password>
      </template>
      <b-form-group
        label="Role"
        label-for="role"
        :state="!!user.role"
        invalid-feedback="Please specify role"
      >
        {{ user.role }}
        <b-form-select
          id="role"
          v-model="user.role"
          required
          :options="roleOptions"
        ></b-form-select>
      </b-form-group>
      <b-button block variant="primary" @click="save" :disabled="!isValid"
        >Save</b-button
      >
    </b-form>
  </div>
</template>

<script>
import Password from '~/components/Password'
export default {
  components: { Password },
  props: {
    uid: {
      type: String,
      default: ''
    },
    email: {
      type: String,
      default: ''
    },
    displayName: {
      type: String,
      default: ''
    },
    phoneNumber: {
      type: String,
      default: ''
    },
    role: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      user: {
        uid: '',
        displayName: '',
        email: '',
        phoneNumber: '',
        role: '',
        password: ''
      },
      roleOptions: ['viewer', 'editor', 'moderator', 'admin'],
      password: {
        feedback: ''
      }
    }
  },
  computed: {
    isNewUser() {
      return !this.user.uid
    },
    displayNameFeedback() {
      return !this.user.displayName ? 'Enter your name' : ''
    },
    emailFeedback() {
      var isValid = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gim.test(this.user.email)

      return !isValid ? 'Enter valid email' : ''
    },
    roleFeedback() {
      return !this.user.role ? 'Select role' : ''
    },
    isValid() {
      const isValid =
        [
          this.displayNameFeedback,
          this.emailFeedback,
          this.password.feedback,
          this.roleFeedback
        ].filter(p => p).length == 0
      return isValid
    }
  },
  methods: {
    async save() {
      if (!this.isNewUser) this.user.password = null
      console.log(this.user)
      await this.$store.dispatch('user/save', this.user)
      const updatedUid = this.$store.state.user.updated.uid

      this.$emit('on-save', updatedUid)
    }
  },
  mounted() {
    if (this._props.uid) this.user = { ...this._props, password: '' }
  }
}
</script>

<style></style>
