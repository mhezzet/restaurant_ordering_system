import { gql } from 'apollo-server'

export default gql`
  extend type Query {
    item(itemID: ID!): Item
    itemsByRestaurant(restaurantID: ID!): [Item] @user
  }

  extend type Mutation {
    addItem(item: itemInput!, restaurantID: ID!): Item @owner
    removeItem(itemID: ID!): Item @owner
  }

  input itemInput {
    name: String!
    description: String
    category: String!
    prices: [priceInput!]!
    addOns: [addOnsInput!]!
    itemPic: String
  }

  input priceInput {
    variant: String
    price: Float
  }

  input addOnsInput {
    name: String
    price: Float
  }

  type Item {
    id: ID!
    name: String!
    prices: [Price!]!
    description: String
    addOns: [addOn]!
    category: String!
    itemPic: String
    restaurant: Restaurant
  }

  type addOn {
    name: String
    price: Float
  }

  type Price {
    price: Float
    variant: String
  }
`
