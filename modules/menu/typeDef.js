import { gql } from "apollo-server";

export default gql`

extend type Query{
    menu(menuID:ID):Menu
}

extend type Mutation{
    addMenu(items:[ID!]!,restaurant:ID):Menu
    addItemToMenu(itemID:ID):Menu
    removeItemFromMenu(itemID:ID):Menu
}


type Menu{
    id:ID
    items:[Item!]
    restaurant:Restaurant
}


`