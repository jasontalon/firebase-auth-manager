module.exports = firebase => {
  return {
    middleware: require('./middleware')(firebase),
    routes: require('./routes')(firebase)
  }
}
