import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

//sets up the firebase client sdk.
//inject to vue instance and context
export default function(context, inject) {
  const firebaseClientConfig = require('../firebase.client.config.json')

  if (!firebase.apps.length) firebase.initializeApp(firebaseClientConfig)

  context.$firebase = firebase
  inject('firebase', firebase)
}
