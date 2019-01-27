import { gql } from 'apollo-server'

export default gql`
  extend type Query {
    order(orderID: ID): Order
    ordersByRestaurant(restaurantID: ID): [Order!]!
  }

  type Subscription {
    addedOrder(restaurantID: ID!): Order
  }

  extend type Mutation {
    makeOrder(order: orderInput): Order @user
    updateOrderState(orderID: ID!, state: State!): Order
  }

  input orderInput {
    inventory: ID!
    resturant: ID!
    user: ID!
  }

  type Order {
    id: ID
    state: State
    totalPrice: Float
    inventory: Inventory
    restaurant: Restaurant
    user: User
  }

  enum State {
    OUT_FOR_DELEVERY
    COMPLETED
    DELEVERED
    DECLINED
  }
`
