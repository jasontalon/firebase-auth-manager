export const state = () => {
  return {
    serviceStarted: false,
    currentUser: {
      token: '',
      uid: '',
      email: '',
      displayName: '',
      claims: {}
    },
    users: []
  }
}
export const getters = {
  getCurrentUser: state => {
    return state.currentUser
  }
}
export const mutations = {
  setCurrentUser(state, currentUser) {
    state.currentUser = currentUser
  },
  //a flag once the firebase auth observer has been triggered (onAuthStateChanged, onIdTokenChanged)
  setServiceStarted(state, value) {
    state.serviceStarted = value
  },
  setUsers(state, users) {
    state.users = users
  }
}

export const actions = {
  async findCurrentUser(store) {
    console.log('find current user')
    const user = this.$firebase.auth().currentUser,
      isAuthServiceNotStarted = !store.state.serviceStarted

    store.commit(
      'setCurrentUser',
      user ? await parseUser(this.$firebase, user) : null
    )

    if (isAuthServiceNotStarted) store.commit('setServiceStarted', true)
  },

  async getUsers(store) {
    try {
      const data = await this.$axios.$get('/api/admin/users')
      console.log(data)
      store.commit('setUsers', data)
    } catch (error) {
      console.log(error)
    }
  }
}

async function parseUser(firebase, user) {
  //note: avoid destructuring firebase objects. sometimes it returns null
  const parsedToken = await firebase.auth().currentUser.getIdTokenResult()
  const parsedUser = {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    token: parsedToken.token,
    claims: parsedToken.claims
  }
  return parsedUser
}
