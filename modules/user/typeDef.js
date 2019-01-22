import { gql } from 'apollo-server'

export default gql`
  directive @user on FIELD_DEFINITION
  directive @admin on FIELD_DEFINITION
  directive @owner on FIELD_DEFINITION
  directive @cashier on FIELD_DEFINITION

  type Query {
    profile: User
    user(userID: ID): User
    users: [User!]!
    usersByRestaurant(restaurantID: ID): [User!]!
  }

  type Mutation {
    registerLocal(email: String, password: String): registerResolver
    loginMessenger(messengerUserID: ID): registerResolver
    loginLocal(email: String, password: String): registerResolver
    updateProfile(userID: ID, user: updateProfileInput): User
    deleteUser(userID: ID): User
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
    loginType: LoginType
    userName: String
    password: String
    restaurant: Restaurant
    addresses: [Address!]!
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
