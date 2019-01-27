import { gql } from 'apollo-server'

export default gql`
  extend type Query {
    address(addressID: ID!): Address @user
    addresses: [Address!]! @user
  }

  extend type Mutation {
    addAddress(address: addressInput!): Address @user
    updateAddress(addressID: ID, address: addressInput!): Address @user
    deleteAddress(addressID: ID!): Address @user
  }

  input addressInput {
    city: String
    district: String
    street: String
    buildingNo: String
    direction: String
    phone: String
    title: String
  }

  type Address {
    id: ID
    city: String
    district: String
    street: String
    buildingNo: String
    direction: String
    phone: String
    title: String
  }
`
