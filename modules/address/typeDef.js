import { gql } from "apollo-server";

export default gql`

extend type Query{
 address(addressID:ID):Address
 addresses:[Address!]!
}

extend type Mutation{
    addAddress(address:addressInput):Address
    editAddress(addressID:ID,address:addressInput):Address
    deleteAddress(addressID:ID):Address
}

input addressInput{
    city:String
    district:String
    street:String
    buildingNo:String
    direction:String  
}

type Address{
    id:ID
    city:String
    district:String
    street:String
    buildingNo:String
    direction:String
}
`