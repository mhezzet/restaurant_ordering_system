import { gql } from 'apollo-server'

export default gql`
  extend type Query {
    item(itemID: ID!): Item
    itemsByRestaurant(restaurantID: ID!): [Item]
  }

  extend type Mutation {
    addItem(item: itemInput, restaurantID: ID!): Item @owner
    removeItem(itemID: ID!): Item @owner
    addPrice(itemID: ID!, price: priceInput): Item @owner
    addAddOnSingle(itemID: ID!, addOn: addOnsInput): Item @owner
    addAddOnMulti(itemID: ID!, addOn: addOnsInput): Item @owner
  }

  input itemInput {
    name: String!
    description: String
    category: String!
    itemPic: String
  }

  input priceInput {
    variant: String
    price: Float
  }

  input addOnsInput {
    id: ID
    name: String
    price: Float
  }

  type Item {
    id: ID!
    name: String!
    prices: [Price!]!
    description: String
    singleAddOns: [addOn]
    multiAddOns: [addOn]
    category: String!
    itemPic: String
    restaurant: Restaurant
  }

  type addOn {
    id: ID
    name: String
    price: Float
  }

  type Price {
    id: ID
    price: Float
    variant: String
  }
`
