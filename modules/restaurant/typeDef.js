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
    ): registerResolver @admin
    addCashier(
      userName: String!
      password: String!
      restaurantID: ID
    ): registerResolver @admin
  }

  input restaurantInput {
    title: String!
    messengerBotID: ID!
    workingHours: [dailyScheduleInput]
    redemptionItems: [redemptionItemInput]
    deleveryFees: Float
  }

  input redemptionItemInput {
    itemName: String
    costPoints: Int
  }

  input dailyScheduleInput {
    day: Day
    startTime: Int
    endTime: Int
  }

  type Restaurant {
    id: ID
    title: String
    cashier: User
    owner: User
    messengerBotID: ID
    workingHours: [dailySchedule]
    redemptionItems: [redemptionItem]
    deleveryFees: Float!
  }

  type dailySchedule {
    day: Day
    startTime: Int
    endTime: Int
  }

  type redemptionItem {
    id: ID
    itemName: String
    costPoints: Int
  }

  enum Day {
    Friday
    Monday
    Saturday
    Sunday
    Thursday
    Tuesday
    Wednesday
  }
`
