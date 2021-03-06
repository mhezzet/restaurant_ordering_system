import Joi from 'joi'

const messengerBotID = Joi.string()
  .max(100)
  .required()
const day = Joi.string().max(10)
const title = Joi.string()
  .max(50)
  .min(3)
  .required()
const startTime = Joi.string()
  .max(10)
  .required()
const deleveryFees = Joi.number().min(0)
const endTime = Joi.string()
  .max(10)
  .required()
const userName = Joi.string()
  .max(50)
  .min(4)
  .required()
const password = Joi.string()
  .max(1024)
  .min(4)
  .required()
const vat = Joi.boolean()
const restaurantLogo = Joi.string().max(200)
const priority = Joi.number()
  .min(0)
  .max(10)

const slug = Joi.string().required()
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
    endTime,
    vat,
    restaurantLogo,
    priority
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
      endTime,
      vat,
      restaurantLogo,
      priority
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

export const restaurantBySlugValidator = input => {
  const schema = Joi.object({
    slug
  })

  return schema.validate(input)
}
