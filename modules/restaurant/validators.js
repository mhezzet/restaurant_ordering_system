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
const deleveryFees = Joi.number().min(0)
const endTime = Joi.number()
  .max(1440)
  .min(0)
const userName = Joi.string()
  .max(50)
  .min(4)
  .required()
const password = Joi.string()
  .max(1024)
  .min(4)
  .required()

const itemName = Joi.string().max(50)
const costPoints = Joi.number().min(0)

export const restaurantValidator = input => {
  const schema = Joi.object({ restaurantID: Joi.objectId() })
  return schema.validate(input)
}

export const addRestaurantValidator = input => {
  const schema = Joi.object({
    messengerBotID,
    title,
    deleveryFees,
    startTime,
    endTime
  })
  return schema.validate(input)
}

export const updateRestaurantValidator = input => {
  const schema = Joi.object({
    restaurantID: Joi.objectId(),
    restaurant: Joi.object({
      messengerBotID,
      title,
      deleveryFees,
      startTime,
      endTime
    })
  })

  return schema.validate(input)
}

export const deleteRestaurantValidator = input => {
  const schema = Joi.object({ restaurantID: Joi.objectId() })
  return schema.validate(input)
}

export const addOwnerValidator = input => {
  const schema = Joi.object({
    restaurantID: Joi.objectId(),
    userName,
    password
  })
  return schema.validate(input)
}

export const addCashierValidator = input => {
  const schema = Joi.object({
    restaurantID: Joi.objectId(),
    userName,
    password
  })
  return schema.validate(input)
}

export const addRedemptionItemValidator = input => {
  const schema = Joi.object({
    restaurantID: Joi.objectId(),
    redemptionItem: {
      itemName,
      costPoints
    }
  })
  return schema.validate(input)
}

export const removeRedemptionItemValidator = input => {
  const schema = Joi.object({
    redemptionItemID: Joi.objectId(),
    restaurantID: Joi.objectId()
  })

  return schema.validate(input)
}
