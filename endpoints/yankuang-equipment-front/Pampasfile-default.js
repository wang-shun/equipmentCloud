module.exports = () => {
  return {
    port: 8080,
    root: __dirname,
    statics: 'public/dist',
    handlebars: {
      views: 'public/dist'
    }
  }
}
