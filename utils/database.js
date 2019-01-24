import mongoose from 'mongoose'
import config from 'config'
import Joi from 'joi'
import joiBind from 'joi-objectid'
import logger from './logger'

export default function() {
  Joi.objectId = joiBind(Joi)
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
