import { UserInputError } from 'apollo-server'
import {
  addCashierValidator,
  addOwnerValidator,
  addRedemptionItemValidator,
  addRestaurantValidator,
  deleteRestaurantValidator,
  removeRedemptionItemValidator,
  restaurantValidator,
  updateRestaurantValidator,
  restaurantBySlugValidator
} from './validators'

import slugify from 'slugify'

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
    throw new UserInputError('restaurant messenger Bot ID is already exist ')

  restaurant = await Restaurant.findOne({
    title: args.restaurant.title
  })
  if (restaurant) throw new UserInputError('restaurant title is already exist ')

  restaurant = await Restaurant.create({
    ...args.restaurant,
    slug: slugify(args.restaurant.title, { lower: true })
  })
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
async function addOwner(_, args, { models: { User, Restaurant } }) {
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

  const restaurant = await Restaurant.findOneAndUpdate(
    { _id: args.restaurantID },
    {
      $set: {
        owner: user._id
      }
    },
    {
      new: true
    }
  ).populate('cashier owner')

  return restaurant
}
/**
|--------------------------------------------------
| Add Cahsier
|--------------------------------------------------
*/
async function addCashier(_, args, { models: { User, Restaurant } }) {
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

  const restaurant = await Restaurant.findOneAndUpdate(
    { _id: args.restaurantID },
    { $set: { cashier: user._id } },
    { new: true }
  ).populate('cashier owner')

  return restaurant
}

/**
|--------------------------------------------------
| Add Redemption Item
|--------------------------------------------------
*/

async function addRedemptionItem(_, args, { models: { User, Restaurant } }) {
  const { error } = addRedemptionItemValidator(args)
  if (error) throw new UserInputError(error.details[0].message)

  const restaurant = await Restaurant.findOneAndUpdate(
    { _id: args.restaurantID },
    { $push: { redemptionItems: args.redemptionItem } },
    { new: true }
  ).populate('cashier owner')

  if (!restaurant) throw new UserInputError('there is no such a restaurant')

  return restaurant
}

/**
|--------------------------------------------------
| Remove Redemption Item
|--------------------------------------------------
*/

async function removeRedemptionItem(_, args, { models: { User, Restaurant } }) {
  const { error } = removeRedemptionItemValidator(args)
  if (error) throw new UserInputError(error.details[0].message)

  const restaurant = await Restaurant.findOneAndUpdate(
    { _id: args.restaurantID },
    { $pull: { redemptionItems: { _id: args.redemptionItemID } } },
    { new: true }
  ).populate('cashier owner')

  if (!restaurant) throw new UserInputError('there is no such a restaurant')

  return restaurant
}

/**
|--------------------------------------------------
| Restaurants Logo
|--------------------------------------------------
*/

async function restaurantsLogo(_, args, { models: { Restaurant } }) {
  const restaurants = await Restaurant.find().sort('-priority')
  return restaurants
}

/**
|--------------------------------------------------
| restaurantBySlug
|--------------------------------------------------
*/

async function restaurantBySlug(_, args, { models: { Restaurant } }) {
  const { error } = restaurantBySlugValidator(args)
  if (error) throw new UserInputError(error.details[0].message)

  const restaurant = await Restaurant.findOne({ slug: args.slug })
  if (!restaurant) throw new UserInputError('no such a restaurant')

  return restaurant
}

export default {
  Query: {
    restaurant,
    restaurants,
    restaurantsLogo,
    restaurantBySlug
  },
  Mutation: {
    addRestaurant,
    updateRestaurant,
    deleteRestaurant,
    addOwner,
    addCashier,
    addRedemptionItem,
    removeRedemptionItem
  }
}
