import Joi from 'joi'

const name = Joi.string()
  .max(50)
  .required()
const description = Joi.string().max(300)
const category = Joi.string()
  .max(50)
  .required()
const itemPic = Joi.string()
  .max(1024)
  .required()
const itemName = Joi.string().max(50)
const price = Joi.number().min(0)
const size = Joi.string().max(50)

export const addItemValidator = input => {
  const schema = Joi.object({
    restaurantID: Joi.objectid(),
    item: Joi.object({
      name,
      description,
      category,
      itemPic,
      prices: Joi.object({
        size,
        price
      }),
      addOns: Joi.object({
        name: itemName,
        price
      })
    })
  })

  return schema.validate(input)
}

export const removeItemValidator = input => {
  const schema = Joi.object({ itemId: Joi.objectid() })

  return schema.validate(input)
}

export const itemValidator = input => {
  const schema = Joi.object({ itemId: Joi.objectid() })

  return schema.validate(input)
}
