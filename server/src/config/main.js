let { join } = require('path')
const isDevelopmentEnv =
  process.env.NODE_ENV && process.env.NODE_ENV === 'development'
const dbhost = isDevelopmentEnv ? 'localhost' : 'localhost'
const redishost = isDevelopmentEnv ? '127.0.0.1' : 'localhost'

let config = {
  env: isDevelopmentEnv ? 'development' : 'production',

  // Secret key for JWT signing and encryption
  secret: 'super-secret-passphrase',

  // Database connection information
  database: `mongodb://${dbhost}:27017/poetry`,

  // Setting port for server
  port: process.env.PORT || 6000,

  redis: {
    session: {
      host: `${redishost}`,
      port: 6379,
      db: 2
    },
    client: {
      host: `${redishost}`,
      port: 6379,
      db: 3
    }
  },

  // Avatar upload path
  avatarUploadDir: join(__dirname, './../../upload/avatar/')
}

module.exports = config
