import Joi from 'joi'

export const orderValidator = input => {
  const schema = Joi.object({ orderID: Joi.objectid() })
  return schema.validate(input)
}

export const updateOrderStateValidator = input => {
  const schema = Joi.object({
    orderID: Joi.objectid(),
    state: Joi.string().required()
  })
  return schema.validate(input)
}

export const ordersByRestaurantValidator = input => {
  const schema = Joi.object({ restaurantID: Joi.objectid() })
  return schema.validate(input)
}

export const makeOrderValidator = input => {
  const schema = Joi.object({
    order: Joi.object({
      inventory: Joi.objectid(),
      resturant: Joi.objectid(),
      user: Joi.objectid()
    })
  })
  return schema.validate(input)
}
