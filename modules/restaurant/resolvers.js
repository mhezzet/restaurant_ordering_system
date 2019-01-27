import {
  restaurantValidator,
  addRestaurantValidator,
  updateRestaurantValidator,
  deleteRestaurantValidator,
  addOwnerValidator,
  addCashierValidator
} from './validators'
import { UserInputError } from 'apollo-server'

/**
|--------------------------------------------------
| Restaurant
|--------------------------------------------------
*/
async function restaurant(_, args, { models: { Restaurant } }) {
  const { error } = restaurantValidator(args)
  if (error) throw new UserInputError(error.details[0].message)

  const restaurant = await Restaurant.findOne({
    _id: args.restaurantID
  }).populate('owner cashier')
  if (!restaurant) throw new UserInputError('no such a restaurant')

  return restaurant
}

/**
|--------------------------------------------------
| Restaurants
|--------------------------------------------------
*/
async function restaurants(_, __, { models: { Restaurant } }) {
  const restaurants = await Restaurant.find({}).populate('owner cashier')

  return restaurants
}

/**
|--------------------------------------------------
| Add Restaurant
|--------------------------------------------------
*/

async function addRestaurant(_, args, { models: { Restaurant } }) {
  const { error } = addRestaurantValidator(args.restaurant)
  if (error) throw new UserInputError(error.details[0].message)

  let restaurant = await Restaurant.findOne({
    messengerBotID: args.restaurant.messengerBotID
  })
  if (restaurant)
    throw new UserInputError('restaurant messenger Bot ID is already exist')

  restaurant = await Restaurant.create(args.restaurant)
  return restaurant
}

/**
|--------------------------------------------------
| Update Restaurant
|--------------------------------------------------
*/

async function updateRestaurant(_, args, { models: { Restaurant } }) {
  const { error } = updateRestaurantValidator(args)
  if (error) throw new UserInputError(error.details[0].message)

  const restaurant = await Restaurant.findOneAndUpdate(
    { _id: args.restaurantID },
    {
      $set: {
        ...args.restaurant
      }
    },
    { new: true }
  ).populate('cashier owner')
  if (!restaurant) throw new UserInputError('no such a restaurant')

  return restaurant
}

/**
|--------------------------------------------------
| Delete Restaurant
|--------------------------------------------------
*/

async function deleteRestaurant(_, args, { models: { Restaurant } }) {
  const { error } = deleteRestaurantValidator(args)
  if (error) throw new UserInputError(error.details[0].message)

  const restaurant = await Restaurant.findOneAndRemove({
    _id: args.restaurantID
  })
  if (!restaurant) throw new UserInputError('no such a restaurant')

  return restaurant
}

/**
|--------------------------------------------------
| Add Owner
|--------------------------------------------------
*/
async function addOwner(_, args, { models: { User } }) {
  const { error } = addOwnerValidator(args)
  if (error) throw new UserInputError(error.details[0].message)

  let user = await User.findOne({ userName: args.userName })
  if (user) throw new UserInputError('user name is already exist')

  user = await User.create({
    ...args,
    roles: ['OWNER', 'CASHIER'],
    loginType: 'LOCAL',
    restaurant: args.restaurantID
  })

  await User.populate(user, 'restaurant')

  const token = user.genToken()
  return { user, token }
}
/**
|--------------------------------------------------
| Add Cahsier
|--------------------------------------------------
*/
async function addCashier(_, args, { models: { User } }) {
  const { error } = addCashierValidator(args)
  if (error) throw new UserInputError(error.details[0].message)

  let user = await User.findOne({ userName: args.userName })
  if (user) throw new UserInputError('user name is already exist')

  user = await User.create({
    ...args,
    roles: ['CASHIER'],
    loginType: 'LOCAL',
    restaurant: args.restaurantID
  })

  await User.populate(user, 'restaurant')
  const token = user.genToken()

  return { user, token }
}

export default {
  Query: {
    restaurant,
    restaurants
  },
  Mutation: {
    addRestaurant,
    updateRestaurant,
    deleteRestaurant,
    addOwner,
    addCashier
  }
}
