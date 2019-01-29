import {
  orderValidator,
  ordersByRestaurantValidator,
  makeOrderValidator
} from './validators'
import { UserInputError, AuthenticationError, withFilter } from 'apollo-server'

import { pubsub } from '../../index'

/**
|--------------------------------------------------
| Order
|--------------------------------------------------
*/

async function order(_, args, { models: { Order } }) {
  const { error } = orderValidator(args)
  if (error) throw new UserInputError(error.details[0].message)

  const order = await Order.findOne({
    _id: args.orderID
  }).populate('restaurant user inventory address')
  if (!order) throw new UserInputError('no such an order')

  return order
}

/**
|--------------------------------------------------
| Orders By Restaurant
|--------------------------------------------------
*/

async function ordersByRestaurant(_, args, { models: { Order } }) {
  const { error } = ordersByRestaurantValidator(args)
  if (error) throw new UserInputError(error.details[0].message)

  const restaurants = await Order.find({
    restaurant: args.restaurantID
  }).populate('restaurant user inventory address')

  return restaurants
}

/**
|--------------------------------------------------
| Make an Order
|--------------------------------------------------
*/

async function makeOrder(
  _,
  args,
  {
    models: { Order, Inventory, Restaurant, User, Address },
    user: requestedUser
  }
) {
  const { error } = makeOrderValidator(args)
  if (error) throw new UserInputError(error.details[0].message)

  const address = await Address.findOne({ _id: args.order.address })
  if (!address) throw new UserInputError('error, in valid Address')

  const inventory = await Inventory.findOne({ _id: args.order.inventory })
  if (!inventory) throw new UserInputError('error, in valid inventory')

  const user = await User.findOne({ _id: args.order.user })
  if (!user) throw new UserInputError('error, in valid user')

  const restaurant = await Restaurant.findOne({ _id: args.order.restaurant })
  if (!restaurant) throw new UserInputError('error, in valid restaurant')

  if (user._id != requestedUser.id)
    throw new AuthenticationError('u r not authorized')

  const redemptionItem = restaurant.redemptionItems.find(
    item => item._id == args.order.redemptionItem
  )
  if (redemptionItem && user.loyaltyPoints - redemptionItem.costPoints < 0)
    throw new UserInputError(
      'invalid redemtion item or not enough loyality points'
    )

  const price = inventory.items.reduce(
    (totalPrice, item) =>
      totalPrice +
      item.price +
      item.addOns.reduce((totalAddOn, addOne) => totalAddOn + addOne.price, 0),
    0
  )

  const totalPrice = price + restaurant.deleveryFees

  const order = await Order.create({
    ...args.order,
    orderPrice: price,
    totalPrice,
    state: 'NO_ACTION',
    redemptionItem
  })
  if (redemptionItem) user.loyaltyPoints -= redemptionItem.costPoints
  user.loyaltyPoints += price
  await user.save()

  await Order.populate(order, 'restaurant user inventory address')
  pubsub.publish('added_orders', { addedOrder: order })

  return order
}

/**
|--------------------------------------------------
| Update Order State
|--------------------------------------------------
*/

async function updateOrderState(_, args, { models: { Order } }) {
  const { error } = updateOrderState(args)
  if (error) throw new UserInputError(error.details[0].message)

  const order = await Order.findOneAndUpdate(
    { _id: args.orderID },
    { $set: { state: args.state } },
    { new: true }
  ).populate('restaurant user inventory address')
  if (!order) throw new UserInputError('no such an order')

  return order
}

/**
|--------------------------------------------------
| addedOrder
|--------------------------------------------------
*/

const addedOrder = {
  subscribe: withFilter(
    () => pubsub.asyncIterator('added_orders'),
    (payload, variables) => {
      return payload.addedOrder.restaurant._id == variables.restaurantID
    }
  )
}

export default {
  Query: {
    order,
    ordersByRestaurant
  },
  Mutation: {
    makeOrder,
    updateOrderState
  },
  Subscription: {
    addedOrder
  }
}
