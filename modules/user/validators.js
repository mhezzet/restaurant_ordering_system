import Joi from 'joi'

const userName = Joi.string()
    .max(50)
    .min(4)
    .required(),
  password = Joi.string()
    .max(1024)
    .min(4)
    .required(),
  messengerUserID = Joi.string()
    .max(100)
    .required(),
  firstName = Joi.string()
    .min(4)
    .max(50),
  lastName = Joi.string()
    .min(4)
    .max(50),
  profilePic = Joi.string()
    .min(4)
    .max(1024),
  gender = Joi.string()

export const addAdminValidtator = input => {
  const schema = Joi.object({
    userName,
    password
  })

  return schema.validate(input)
}

export const loginMessengerValidtator = input => {
  const schema = Joi.object({ messengerUserID })
  return schema.validate(input)
}

export const loginLocalValidtator = input => {
  const schema = Joi.object({
    userName,
    password
  })

  return schema.validate(input)
}

export const updateProfileValidator = input => {
  const schema = Joi.object({
    userID: Joi.objectId(),
    user: Joi.object({
      firstName,
      lastName,
      profilePic,
      gender,
      restaurant: Joi.objectId()
    })
  })

  return schema.validate(input)
}

export const deleteUserValidator = input => {
  const schema = Joi.object({ userID: Joi.objectId() })
  return schema.validate(input)
}

export const usersByRestaurantValidtator = input => {
  const schema = Joi.object({ restaurantID: Joi.objectId() })
  return schema.validate(input)
}
