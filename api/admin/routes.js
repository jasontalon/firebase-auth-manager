const express = require('express'),
  router = express.Router()

module.exports = function(firebase) {
  router.get('/users', async (req, res) => {
    const listUsersResult = await firebase.auth().listUsers()
    res.status(200).jsonp(listUsersResult)
  })

  router.post('/user/create', async (req, res) => {
    try {
      const {
        displayName = null,
        email = null,
        password = null,
        role = null
      } = req.body
      const { uid } = await firebase.auth().createUser({
        displayName,
        email,
        password
      })

      if (role) await firebase.auth().setCustomUserClaims(uid, { [role]: true })

      res.status(200).jsonp({ uid })
    } catch (error) {
      res.status(400).jsonp(error)
    }
  })

  router.get('/user/:uid', async (req, res) => {
    try {
      const { uid } = req.params
      const user = await firebase.auth().getUser(uid)
      res.jsonp(user)
    } catch (error) {
      res.status(404).jsonp(error)
    }
  })

  router.delete('/user/:uid', async (req, res) => {
    try {
      const { uid } = req.params
      await firebase.auth().deleteUser(uid)
      res.status(200)
    } catch (error) {
      res.status(400).jsonp(error)
    }
  })

  router.put('/user/:uid', async (req, res) => {
    try {
      const { uid } = req.params,
        user = ({
          email = null,
          emailVerified = null,
          password = null,
          photoURL = null,
          disabled = null,
          phoneNumber = null,
          displayName = null
        } = req.body)

      await firebase.auth().updateUser(uid, user)

      res.status(200).send('OK')
    } catch (error) {
      res.status(400).jsonp(error)
    }
  })

  return router
}
