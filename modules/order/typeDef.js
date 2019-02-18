import { gql } from 'apollo-server'

export default gql`
  extend type Query {
    order(orderID: ID): Order
    ordersByRestaurant(restaurantID: ID): [Order!]! @cashier
    allOrdersByRestaurant(restaurantID: ID!): [Order!]! @owner
    lastOrdersByUser(userID: ID!): [Inventory!]! @user
  }

  type Subscription {
    addedOrder(restaurantID: ID): Order
  }

  extend type Mutation {
    makeOrder(
      inventory: ID!
      restaurant: ID!
      user: ID!
      address: ID!
      redemptionItem: ID
    ): Order @user
    updateOrderState(orderID: ID!, state: State!): Order @cashier
  }

  type Order {
    id: ID
    state: State
    totalPrice: Float
    orderPrice: Float
    inventory: Inventory
    restaurant: Restaurant
    redemptionItem: RedemptionItem
    user: User
    address: Address
  }

  type RedemptionItem {
    itemName: String
    costPoints: Float
  }

  enum State {
    OUT_FOR_DELEVERY
    COMPLETED
    DECLINED
    NO_ACTION
  }
`
