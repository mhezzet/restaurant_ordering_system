import { gql } from 'apollo-server'

export default gql`
  extend type Query {
    inventory(inventoryID: ID!): Inventory @user
  }

  extend type Mutation {
    createInventory(items: [ID!]!, comment: String): Inventory @user
  }

  type Inventory {
    id: ID
    items: [Item]
    comment: String
  }
`
