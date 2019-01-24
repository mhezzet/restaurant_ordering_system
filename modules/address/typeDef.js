import { gql } from 'apollo-server'

export default gql`
  extend type Query {
    address(addressID: ID): Address
    addresses: [Address!]!
  }

  extend type Mutation {
    addAddress(address: addressInput, user: ID): Address
    editAddress(addressID: ID, address: addressInput, user: ID): Address
    deleteAddress(addressID: ID): Address
  }

  input addressInput {
    city: String
    district: String
    street: String
    buildingNo: String
    direction: String
    phone: String
  }

  type Address {
    id: ID
    city: String
    district: String
    street: String
    buildingNo: String
    direction: String
    phone: String
  }
`
