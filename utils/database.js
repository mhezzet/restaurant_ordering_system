import mongoose from 'mongoose'
import config from 'config'
import logger from './logger'

export default function() {
  mongoose
    .connect(
      config.get('DB_URI'),
      { useCreateIndex: true, useFindAndModify: false }
    )
    .then(() => {
      logger.info(`🎉 connected to ${config.get('env')} db`)
    })
    .catch(error => {
      logger.error(`${error}`)
    })
}
