import Joi from 'joi'

const messengerBotID = Joi.string()
  .max(100)
  .required()
const day = Joi.string().max(10)
const title = Joi.string()
  .max(50)
  .min(3)
  .required()
const startTime = Joi.number()
  .max(1440)
  .min(0)
const endTime = Joi.number()
  .max(1440)
  .min(0)

export const restaurantValidator = input => {
  const schema = Joi.object({ restaurantID: Joi.objectId() })
  return schema.validate(input)
}

export const addRestaurantValidator = input => {
  const schema = Joi.object({
    messengerBotID,
    title,
    workingHours: Joi.array().items({ day, endTime, startTime })
  })
  return schema.validate(input)
}

export const updateRestaurantValidator = input => {
  const schema = Joi.object({
    restaurantID: Joi.objectId(),
    restaurant: Joi.object({
      messengerBotID,
      title,
      workingHours: Joi.array().items({ day, endTime, startTime })
    })
  })

  return schema.validate(input)
}

export const deleteRestaurantValidator = input => {
  const schema = Joi.object({ restaurantID: Joi.objectId() })
  return schema.validate(input)
}
