const express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  firebase = require('firebase-admin'),
  serviceAccount = require('../firebase.admin.config.json'),
  { FIREBASE_DATABASE_URL = '' } = process.env

app.set('json spaces', 2)
app.use([bodyParser.urlencoded({ extended: false }), bodyParser.json()])

setupFirebase()
setupAdmin()

app.listen(() => {
  console.log('api now online')
})

function setupFirebase() {
  if (!firebase.apps.length)
    firebase.initializeApp({
      credential: firebase.credential.cert(serviceAccount),
      databaseURL: FIREBASE_DATABASE_URL
    })
}

function setupAdmin() {
  const { middleware, routes } = require('./admin')(firebase)
  app.use('/admin', [middleware, routes])
}

module.exports = {
  path: '/api',
  handler: app
}
