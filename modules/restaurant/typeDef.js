import { gql } from 'apollo-server'

export default gql`
  extend type Query {
    restaurant(restaurantID: ID): Restaurant
    restaurants: [Restaurant]
  }

  extend type Mutation {
    addRestaurant(restaurant: restaurantInput): Restaurant
    updateRestaurant(restaurantID: ID, restaurant: restaurantInput): Restaurant
    deleteRestaurant(restaurantID: ID): Restaurant
  }

  input restaurantInput {
    cashier: ID
    owner: ID
    messengerBotID: ID
    workingHours: [dailyScheduleInput]
  }

  input dailyScheduleInput {
    day: Day
    startTime: Int
    endTime: Int
  }

  type Restaurant {
    id: ID
    cashier: User
    owner: User
    messengerBotID: ID
    workingHours: [dailySchedule]
  }

  type dailySchedule {
    day: Day
    startTime: Int
    endTime: Int
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
