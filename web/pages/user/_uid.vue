<template>
  <div>
    <user
      :uid="this.user.uid"
      :display-name="user.displayName"
      :email="this.user.email"
      :role="this.role"
    ></user>
  </div>
</template>

<script>
import User from '~/components/User'
import { mapState } from 'vuex'
export default {
  components: { User },

  computed: {
    ...mapState({ user: state => state.user.user }),
    role() {
      const { user: { customClaims = null } = null } = this

      if (!customClaims) return ''

      console.log(customClaims)
      const role = Object.keys(customClaims).find(claim => claim)
      console.log(role)
      return role
    }
  },
  async mounted() {
    console.log('mounted')
    await this.$store.dispatch('user/findByUid', this.$route.params.uid)
  }
}
</script>
