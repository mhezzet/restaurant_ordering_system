import Joi from 'joi'

const name = Joi.string().max(50)
const description = Joi.string().max(300)
const category = Joi.string()
  .max(50)
  .required()
const itemPic = Joi.string()
  .max(1024)
  .required()
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
      itemPic,
      prices: Joi.array().items({
        variant,
        price
      }),
      addOns: Joi.array().items({
        name: itemName,
        price
      })
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
