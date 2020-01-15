<template>
  <div>
    <b-table small striped hover :items="this.users" :fields="this.fields">
      <template v-slot:cell(email)="data">{{ data.item.email }} </template>
      <template v-slot:cell(disabled)="data"> {{ data.i }}</template>
    </b-table>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  middleware: 'authenticated',
  data() {
    return {
      fields: [
        'selected',
        'email',
        'displayName',
        'disabled',
        {
          key: 'metadata.lastSignInTime',
          label: 'Last sign in'
        },
        {
          key: 'metadata.creationTime',
          label: 'Created At'
        },
        'role'
      ]
    }
  },
  computed: {
    ...mapState({
      users: state => {
        const { users } = state.auth.users
        return users ? users.map(user => ({ ...user, selected: false })) : []
      }
    })
  },
  mounted() {
    this.$store.dispatch('auth/getUsers')
  }
}
</script>
