module.exports = function(firebase) {
  return async function(req, res, next) {
    const { authorization = null } = req.headers

    try {
      if (!authorization) {
        res.status(401).send('unauthorized')
        return
      }

      const idToken = authorization.replace(/bearer/gim, '').trim()
      const { admin = null } = await firebase
        .auth()
        .verifyIdToken(idToken, true)

      if (!admin) res.status(401).send('unauthorized')
      else next()
    } catch (error) {
      const { code = '' } = error

      if (code.includes('id-token-expired'))
        res.status(401).send('unauthorized')
      else res.status(500).send(JSON.stringify(error))
    }
  }
}
