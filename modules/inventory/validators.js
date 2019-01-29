import Joi from 'joi'

const comment = Joi.string().max(500)
const name = Joi.string().max(50)
const price = Joi.number()

export const createInventoryValidator = input => {
  const schema = Joi.object({
    items: Joi.array().items({
      name,
      price,
      addOns: Joi.array().items({
        name,
        price
      })
    }),
    comment
  })
  return schema.validate(input)
}

export const inventoryValidator = input => {
  const schema = Joi.object({
    inventoryID: Joi.objectId()
  })
  return schema.validate(input)
}
