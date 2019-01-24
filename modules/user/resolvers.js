import {
  registerLocalValidtator,
  loginMessengerValidtator,
  loginLocalValidtator,
  updateProfileValidator,
  deleteUserValidator,
  usersByRestaurantValidtator
} from './validators'
import { UserInputError } from 'apollo-server'

/**
|--------------------------------------------------
| Register Local
|--------------------------------------------------
*/
async function registerLocal(_, args, { models: { User, Restaurant } }) {
  const { userName, role } = args

  const { error } = registerLocalValidtator(args)
  if (error) throw new UserInputError(error.details[0].message)

  let roles
  switch (role) {
    case 'ADMIN':
      roles = ['CASHIER', 'USER', 'ADMIN', 'OWNER']
      break
    case 'OWNER':
      roles = ['CASHIER', 'OWNER']
      break
    case 'CASHIER':
      roles = 'CASHIER'
      break
    case 'USER':
      roles = 'USER'
      break
    default:
      roles = 'USER'
      break
  }

  let user = await User.findOne({ userName })
  if (user) throw new UserInputError('user name is already exist')

  if (args.restaurantID) {
    const restaurant = await Restaurant.findOne({ _id: args.restaurantID })
    if (!restaurant) throw new UserInputError('no such a restaurant')
  }

  user = await User.create({
    ...args,
    roles,
    loginType: 'LOCAL'
  })

  await User.populate(user, 'addresses restaurant')
  const token = user.genToken()

  return { token, user }
}

/**
|--------------------------------------------------
| Login Messenger
|--------------------------------------------------
*/

async function loginMessenger(_, args, { models: { User } }) {
  const { error } = loginMessengerValidtator(args)
  if (error) throw new UserInputError(error.details[0].message)

  let user = await User.findOne({ messengerUserID: args.messengerUserID })
  if (user) return { user, token: user.genToken() }

  user = await User.create({
    ...args,
    loginType: 'MESSENGER_ID',
    roles: 'USER'
  })
  const token = user.genToken()

  return { user, token }
}

/**
|--------------------------------------------------
| Login Local
|--------------------------------------------------
*/

async function loginLocal(_, args, { models: { User } }) {
  const { error } = loginLocalValidtator(args)
  if (error) throw new UserInputError(error.details[0].message)

  const user = await User.findOne({ userName: args.userName })
  if (!user) throw new UserInputError('invalid username or password')

  const validPassword = await user.validPassword(args.password)
  if (!validPassword) throw new UserInputError('invalid username or password')

  const token = user.genToken()

  return { user, token }
}

/**
|--------------------------------------------------
| Update Profile
|--------------------------------------------------
*/
async function updateProfile(
  _,
  args,
  { models: { User }, user: requestedUser }
) {
  const { error } = updateProfileValidator(args)
  if (error) throw new UserInputError(error.details[0].message)

  if (args.userID != requestedUser.id)
    throw new UserInputError('access denied, you are not authorized')

  const user = await User.findOneAndUpdate(
    { _id: args.userID },
    { ...args.user },
    { new: true }
  )

  return user
}

/**
|--------------------------------------------------
| Delete User
|--------------------------------------------------
*/

async function deleteUser(_, args, { models: { User } }) {
  const { error } = deleteUserValidator(args)
  if (error) throw new UserInputError(error.details[0].message)

  const user = await User.findOneAndRemove({ _id: args.userID })
  if (!user) throw new UserInputError('no such a user')

  return user
}

/**
|--------------------------------------------------
| profile
|--------------------------------------------------
*/
async function profile(_, __, { models: { User }, user: requestedUser }) {
  console.log(requestedUser)
  const user = await User.findOne({ _id: requestedUser.id }).populate(
    'restaurant addresses'
  )

  return user
}

/**
|--------------------------------------------------
| users
|--------------------------------------------------
*/

async function users(_, __, { models: { User } }) {
  const users = await User.find({}).populate('addresses restaurant')

  return users
}

/**
|--------------------------------------------------
| Users By Restaurant
|--------------------------------------------------
*/

async function usersByRestaurant(_, args, { models: { User } }) {
  const { error } = usersByRestaurantValidtator(args)
  if (error) throw new UserInputError(error.details[0].message)

  const users = await User.find({
    restaurant: args.restaurantID
  }).populate('restaurant addresses')

  return users
}

export default {
  Mutation: {
    registerLocal,
    loginMessenger,
    loginLocal,
    updateProfile,
    deleteUser
  },
  Query: {
    profile,
    users,
    usersByRestaurant
  }
}
