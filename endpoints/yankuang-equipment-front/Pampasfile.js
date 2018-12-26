const _ = require('lodash')

const config = {
  extension: 'server',
  port: 9528,
  csrf: {
    enable: false
  },
  session: {
    store: 'cookie', // or redis, default is cookie
    prefix: 'afsession', // only work for redis store, the prefix of redis key
    cookieKey: 'msid',
    maxAge: 1000 * 60 * 30,
    user: { // 参考 get-login-user 文档
      enable: true, // default true
      idKey: 'userId',
      getService: 'getUserById',
      expire: 1000 * 60 * 5 // 默认 5 分钟，只在 process.env.NODE_ENV !== development 时起效
    }
  }
}

const defaultOptions = require('./Pampasfile-default')()

module.exports = _.defaultsDeep(config, defaultOptions)
