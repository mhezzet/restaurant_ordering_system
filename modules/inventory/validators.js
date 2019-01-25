import Joi from 'joi'

export const createInventoryValidator = input => {
  const schema = Joi.object({
    items: Joi.array()
      .items(Joi.objectid())
      .required(),
    comment: Joi.string().max(500)
  })
  return schema.validate(input)
}

export const inventoryValidator = input => {
  const schema = Joi.object({
    inventoryID: Joi.objectid()
  })
  return schema.validate(input)
}
