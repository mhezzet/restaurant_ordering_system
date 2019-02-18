import Joi from 'joi'

export const orderValidator = input => {
  const schema = Joi.object({ orderID: Joi.objectId() })
  return schema.validate(input)
}

export const updateOrderStateValidator = input => {
  const schema = Joi.object({
    orderID: Joi.objectId(),
    state: Joi.string().required()
  })
  return schema.validate(input)
}

export const ordersByRestaurantValidator = input => {
  const schema = Joi.object({ restaurantID: Joi.objectId() })
  return schema.validate(input)
}

export const makeOrderValidator = input => {
  const schema = Joi.object({
    inventory: Joi.objectId(),
    restaurant: Joi.objectId(),
    user: Joi.objectId(),
    address: Joi.objectId(),
    redemptionItem: Joi.objectId()
  })
  return schema.validate(input)
}

export const lastOrdersByUserValidator = input => {
  const schema = Joi.object({
    userID: Joi.objectId().required()
  })

  return schema.validate(input)
}
