<template>
  <div class="mx-auto" style="max-width:1024px">
    <b-button
      v-show="this.selectedUsers.length > 0"
      @click="this.deleteSelectedUsers"
      >Delete {{ this.selectedUsers.length }} user(s)</b-button
    >
    <b-table small striped hover :items="this.users" :fields="this.fields">
      <template v-slot:cell(selected)="row">
        <b-form-checkbox
          v-model="row.item.selected"
          value="true"
          unchecked-value="false"
          @change="selectUser(row.item.uid, !row.item.selected)"
        >
        </b-form-checkbox>
      </template>

      <template v-slot:cell(email)="row">{{ row.item.email }} </template>
      <template v-slot:cell(actions)="row">
        <b-button :to="'/user/' + row.item.uid">Edit</b-button>
        <b-button>Change Password</b-button>
      </template>
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
        { key: 'selected', label: '' },
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
        'role',
        { key: 'actions', label: 'actions' }
      ],
      selectedUsers: []
    }
  },
  watch: {
    users: {
      handler(val, oldVal) {
        console.log(val)
      },
      deep: true,
      immediate: true
    }
  },
  computed: {
    ...mapState({
      users: state => {
        const { users, pageToken } = state.user.users
        return users
          ? users.map(user => ({ ...user, selected: false, actions: '' }))
          : []
      }
    })
  },
  methods: {
    selectUser(uid, selected) {
      const user = this.users.find(user => user.uid == uid)
      if (!user) return

      user.selected = selected

      if (!selected)
        this.selectedUsers = this.selectedUsers.filter(p => p != uid)
      else this.selectedUsers.push(uid)
    },

    async deleteSelectedUsers() {
      const usersToDelete = this.selectedUsers.join(',')

      await this.$store.dispatch('user/delete', usersToDelete)
      await this.$store.dispatch('user/getUsers')
      this.selectedUsers = []
    }
  },
  async mounted() {
    await this.$store.dispatch('user/getUsers')
  }
}
</script>
