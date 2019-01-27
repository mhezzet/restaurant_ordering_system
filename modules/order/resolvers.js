import {
  orderValidator,
  ordersByRestaurantValidator,
  makeOrderValidator
} from './validators'
import { UserInputError } from 'apollo-server'

/**
|--------------------------------------------------
| Order
|--------------------------------------------------
*/

async function order(_, args, { models: { Order } }) {
  const { error } = orderValidator(args)
  if (error) throw new UserInputError(error.details[0].message)

  const order = await Order.findOne({ _id: args.orderID }).populate(
    'restaurant inventory user'
  )
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

  const restaurants = await Order.find({ restaurant: args.restaurantID })

  return restaurants
}

/**
|--------------------------------------------------
| Make an Order
|--------------------------------------------------
*/

async function makeOrder(_, args, { models: { Order } }) {
  const { error } = makeOrderValidator(args)
  if (error) throw new UserInputError(error.details[0].message)

  const order = await Order.create(...args.order)
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
    { $ser: { state: args.state } }
  ).populate('inventory restaurant user')
  if (!order) throw new UserInputError('no such an order')
}

/**
|--------------------------------------------------
| addedOrder
|--------------------------------------------------
*/

const addedOrder = {}

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
