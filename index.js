import { ApolloServer, PubSub } from 'apollo-server'
import JWT from 'jsonwebtoken'
import config from 'config'
import { schema, models } from './modules'
import logger from './utils/logger'
import databaseInit from './utils/database'

databaseInit()

const pubsub = new PubSub()
const server = new ApolloServer({
  schema,
  context: ({ req }) => {
    let user
    const token = req.headers['authorization'] || null
    try {
      user = JWT.verify(token, config.get('JWT_SECRET'))
    } catch {
      user = null
    }
    return { models, user, pubsub }
  },
  formatError: error => {
    if (
      error.extensions.code === 'INTERNAL_SERVER_ERROR' &&
      config.get('env') === 'producton'
    ) {
      logger.error(error)
      delete error.extensions.exception
    }
    return error
  }
})

server
  .listen({ port: config.get('PORT') })
  .then(({ url }) => {
    logger.info(`💭 running env: ${config.get('env')}`)
    logger.info(`🚀 Server ready at ${url}`)
  })
  .catch(error => {
    logger.error('apollo server error', error)
  })
