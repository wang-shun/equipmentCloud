module.exports = async ({
  router
}) => {
  router.get('/custom-route/test', (ctx) => {
    ctx.response.body = 'Test success'
  })
  router.post('/api/login', (ctx) => {
    ctx.session.userId = 1
    ctx.response.status = 200
  })
}
