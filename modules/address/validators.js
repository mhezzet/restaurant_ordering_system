import Joi from 'joi'

const title = Joi.string().max(50)
const city = Joi.string().max(50)
const district = Joi.string().max(50)
const street = Joi.string().max(50)
const buildingNo = Joi.string().max(50)
const direction = Joi.string().max(700)
const phone = Joi.string().max(15)

export const addressValidator = input => {
  const schema = Joi.object({ addressID: Joi.objectId() })
  return schema.validate(input)
}

export const addAddressValidator = input => {
  const schema = Joi.object({
    title,
    city,
    district,
    street,
    buildingNo,
    direction,
    phone
  })

  return schema.validate(input)
}

export const updateAddressValidator = input => {
  const schema = Joi.object({
    addressID: Joi.objectId(),
    address: {
      title,
      city,
      district,
      street,
      buildingNo,
      direction,
      phone
    }
  })

  return schema.validate(input)
}

export const deleteAddressValidator = input => {
  const schema = Joi.object({ addressID: Joi.objectId() })
  return schema.validate(input)
}
