//watches the auth service
//if auth has been evaluated, then check if there is logged in user.
//if no one logs in yet, then redirect to /signin
export default function({ app: { store, router }, $firebase }) {
  store.watch(
    state => state.auth.serviceStarted,
    authStarted => {
      const notLoggedIn = authStarted && !store.state.auth.currentUser
      if (notLoggedIn) router.push('/signin')
    }
  )

  const findCurrentUser = () => store.dispatch('auth/findCurrentUser')

  $firebase.auth().onAuthStateChanged(findCurrentUser)
  $firebase.auth().onIdTokenChanged(findCurrentUser)
}
