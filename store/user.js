export const state = () => {
  return {
    user: {},
    users: [],
    updated: {
      uid: ''
    }
  }
}

export const mutations = {
  setUsers(state, data) {
    const { users = [], pageToken = '' } = data
    state.users = { users, pageToken }
  },
  setUser(state, user) {
    console.log(user)
    state.user = user
  },
  setUpdatedUid(state, uid) {
    state.updated = { uid }
  }
}

export const actions = {
  async save(store, user) {
    try {
      const method = '$' +( user.uid.length > 0) ? 'put' : 'post'
      console.log({ uid: user.uid, user, method })
      const {
        data: { uid }
      } = await this.$axios[method]('/api/admin/user', user)

      store.commit('setUpdatedUid', uid)
    } catch (error) {
      console.log(error)
    }
  },
  async delete(store, uids) {
    try {
      console.log(uids)
      await this.$axios.delete('/api/admin/user?uid=' + uids)
    } catch (error) {
      console.log(error)
    }
  },
  async findByUid(store, uid) {
    try {
      const { data: user } = await this.$axios.get('/api/admin/user/' + uid)
      store.commit('setUser', user)
    } catch (error) {
      console.log(error)
    }
  },
  async getUsers(store) {
    try {
      const data = await this.$axios.$get('/api/admin/users')

      store.commit('setUsers', data)
    } catch (error) {
      console.log(error)
    }
  },
  async updateUserRole(store, { uid, role }) {
    await this.$axios.post('/api/admin/user/claim', { uid, role })
  }
}
