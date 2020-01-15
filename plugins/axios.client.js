//watcher for the currentUser object.
//if user is logged in, set the Authorization request header of axios with the user's token
export default function({ store, $axios }) {
  store.watch(
    (state, getters) => state.auth.currentUser,
    user => {
      $axios.setToken(user ? user.token : '', 'Bearer')
    }
  )
}
