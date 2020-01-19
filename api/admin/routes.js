const express = require('express'),
  router = express.Router()

module.exports = function(firebase) {
  router.get('/users', async (req, res) => {
    const listUsersResult = await firebase.auth().listUsers()
    res.status(200).jsonp(listUsersResult)
  })

  router.post('/user', async (req, res) => {
    console.log('create!')
    try {
      const {
        displayName = null,
        email = null,
        password = null,
        role = null,
        phoneNumber = null
      } = req.body
      const { uid } = await firebase.auth().createUser({
        displayName,
        email,
        password
      })

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

  router.delete('/user', async (req, res) => {
    try {
      const { uid = '' } = req.query
      console.log('delete users', uid)
      const uidArr = uid.split(',')

      uidArr.forEach(async uid => {
        await firebase.auth().deleteUser(uid)
      })

      res.status(200).send('OK')
    } catch (error) {
      res.status(400).jsonp(error)
    }
  })

  router.put('/user', async (req, res) => {
    try {
      const user = ({
          email = null,
          emailVerified = null,
          password = null,
          photoURL = null,
          disabled = null,
          phoneNumber = null,
          displayName = null
        } = req.body),
        { uid = null } = req.body
      console.log({ user, uid })
      await firebase.auth().updateUser(uid, user)

      res.status(200).jsonp({ uid })
    } catch (error) {
      res.status(400).jsonp(error)
    }
  })

  router.post('/user/claim', async (req, res) => {
    console.log('user/claim')
    try {
      const { uid, role } = req.body

      await firebase.auth().setCustomUserClaims(uid, null) //remove all claims

      await firebase.auth().setCustomUserClaims(uid, { [role]: true })
      res.send(200)
    } catch (error) {
      res.status(400).jsonp(error)
    }
  })

  return router
}
