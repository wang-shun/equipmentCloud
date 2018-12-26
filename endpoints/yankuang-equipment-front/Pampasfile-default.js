module.exports = () => {
  return {
    port: 9528,
    root: __dirname,
    statics: 'public/dist',
    handlebars: {
      views: 'public/dist'
    }
  }
}
