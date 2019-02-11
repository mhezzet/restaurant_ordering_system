import { gql } from 'apollo-server'

export default gql`
  extend type Query {
    restaurant(restaurantID: ID!): Restaurant @admin
    restaurants: [Restaurant!]! @admin
  }

  extend type Mutation {
    addRestaurant(restaurant: restaurantInput!): Restaurant @admin
    updateRestaurant(
      restaurantID: ID!
      restaurant: restaurantInput!
    ): Restaurant @admin
    deleteRestaurant(restaurantID: ID): Restaurant @admin
    addOwner(
      userName: String!
      password: String!
      restaurantID: ID
    ): Restaurant @admin
    addCashier(
      userName: String!
      password: String!
      restaurantID: ID
    ): Restaurant @admin
    addRedemptionItem(
      restaurantID: ID!
      redemptionItem: redemptionItemInput!
    ): Restaurant @owner
    removeRedemptionItem(redemptionItemID: ID!, restaurantID: ID!): Restaurant
      @owner
  }

  input restaurantInput {
    title: String!
    messengerBotID: ID!
    deleveryFees: Float
    startTime: Int
    endTime: Int
  }

  input redemptionItemInput {
    itemName: String!
    costPoints: Int!
  }

  type Restaurant {
    id: ID
    title: String
    cashier: User
    owner: User
    messengerBotID: ID
    redemptionItems: [redemptionItem]
    deleveryFees: Float
    startTime: Int
    endTime: Int
  }

  type redemptionItem {
    id: ID
    itemName: String
    costPoints: Int
  }
`
