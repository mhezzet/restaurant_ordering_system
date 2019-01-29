import { gql } from 'apollo-server'

export default gql`
  extend type Query {
    inventory(inventoryID: ID!): Inventory @user
  }

  extend type Mutation {
    createInventory(items: [itemsCartInput]!, comment: String): Inventory @user
  }

  input itemsCartInput {
    name: String!
    price: Float!
    addOns: [addOnsInput]
  }

  type Inventory {
    id: ID
    items: [ItemCart]
    comment: String
  }

  type ItemCart {
    name: String!
    price: Float!
    addOns: [addOn]
  }
`
