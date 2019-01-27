import { gql } from 'apollo-server'

export default gql`
  directive @user on FIELD_DEFINITION
  directive @admin on FIELD_DEFINITION
  directive @owner on FIELD_DEFINITION
  directive @cashier on FIELD_DEFINITION

  type Query {
    profile: User @user
    users: [User!]! @admin
    usersByRestaurant(restaurantID: ID!): [User!]! @admin
  }

  type Mutation {
    addAdmin(userName: String!, password: String!): registerResolver @admin
    loginMessenger(messengerUserID: ID!): registerResolver
    loginLocal(userName: String!, password: String!): registerResolver
    updateProfile(userID: ID!, user: updateProfileInput!): User @user
    deleteUser(userID: ID): User @admin
  }

  type registerResolver {
    user: User
    token: String
  }

  input updateProfileInput {
    firstName: String
    lastName: String
    profilePic: String
  }

  type User {
    id: ID
    firstName: String
    lastName: String
    gender: Gender
    profilePic: String
    messengerUserID: ID
    roles: [Role!]!
    userName: String
    restaurant: Restaurant
  }

  enum Gender {
    MALE
    FEMALE
  }

  enum Role {
    ADMIN
    USER
    CASHIER
    OWNER
  }

  enum LoginType {
    LOCAL
    MESSENGER_ID
  }
`
