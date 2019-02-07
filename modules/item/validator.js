import Joi from 'joi'

const name = Joi.string().max(50)
const description = Joi.string().max(300)
const category = Joi.string()
  .max(50)
  .required()
const itemPic = Joi.string().max(1024)
const itemName = Joi.string().max(50)
const price = Joi.number().min(0)
const variant = Joi.string().max(50)

export const addItemValidator = input => {
  const schema = Joi.object({
    restaurantID: Joi.objectId(),
    item: Joi.object({
      description,
      name,
      category,
      itemPic
    })
  })

  return schema.validate(input)
}

export const removeItemValidator = input => {
  const schema = Joi.object({ itemID: Joi.objectId() })

  return schema.validate(input)
}

export const itemValidator = input => {
  const schema = Joi.object({ itemID: Joi.objectId() })

  return schema.validate(input)
}

export const itemsByRestaurantValidator = input => {
  const schema = Joi.object({ restaurantID: Joi.objectId() })

  return schema.validate(input)
}

export const addPriceValidator = input => {
  const schema = Joi.object({
    itemID: Joi.objectId(),
    price: Joi.object({
      variant,
      price
    })
  })

  return schema.validate(input)
}

export const addOnValidator = input => {
  const schema = Joi.object({
    itemID: Joi.objectId(),
    addOn: {
      id: Joi.objectId(),
      name,
      price
    }
  })

  return schema.validate(input)
}
