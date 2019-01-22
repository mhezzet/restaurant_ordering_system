import { gql } from "apollo-server";

export default gql`

extend type Query{
 inventory(inventoryID:ID):Inventory
}

extend type Mutation{
    createInventory(items:[ID!]!,comment:String):Inventory
}

type Inventory{
    id:ID
    item:[Item]
    comment:String
}

`