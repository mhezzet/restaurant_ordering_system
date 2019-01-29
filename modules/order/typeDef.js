import { gql } from 'apollo-server'

export default gql`
  extend type Query {
    order(orderID: ID): Order
    ordersByRestaurant(restaurantID: ID): [Order!]! @owner
  }

  type Subscription {
    addedOrder(restaurantID: ID): Order
  }

  extend type Mutation {
    makeOrder(order: orderInput!): Order @user
    updateOrderState(orderID: ID!, state: State!): Order @cashier
  }

  input orderInput {
    inventory: ID!
    restaurant: ID!
    user: ID!
    address: ID!
    redemptionItem: ID
  }

  type Order {
    id: ID
    state: State
    totalPrice: Float
    orderPrice: Float
    inventory: Inventory
    restaurant: Restaurant
    user: User
    address: Address
  }

  enum State {
    OUT_FOR_DELEVERY
    COMPLETED
    DECLINED
    NO_ACTION
  }
`
