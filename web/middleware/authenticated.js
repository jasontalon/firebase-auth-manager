export default function({ store, redirect }) {
  const { serviceStarted, currentUser } = store.state.auth

  // If the user is not authenticated then redirect to /signin page
  if (serviceStarted && !currentUser) redirect('/signin')
}
