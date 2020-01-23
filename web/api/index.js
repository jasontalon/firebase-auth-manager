const app = require('@firebase-auth/api')

const api = app.default()
api.listen(() => {
  console.log('im listening...')
})

module.exports = {
  path: '/api',
  handler: api
}
