import Joi from 'joi'

const selectedLang = Joi.string().max(50)
const quickReplay = Joi.string().max(50)

export const botUsageByUserValidator = input => {
  const schema = Joi.object({
    userID: Joi.objectId()
  })

  return schema.validate(input)
}

export const addUsageValidator = input => {
  const schema = Joi.object({
    userID: Joi.objectId(),
    selectedLang,
    quickReplay
  })

  return schema.validate(input)
}
