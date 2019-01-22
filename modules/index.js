import { makeExecutableSchema } from "apollo-server";
import { Inventory, inventoryTypeDef, inventoryResolvers } from "./inventory";
import { Item, itemResolvers, itemTypeDef } from "./item";
import { Menu, menuResolvers, menuTypeDef } from "./menu";
import { Order, orderResolvers, orderTypeDef } from "./order";
import { Restaurant, restaurantResolvers, restaurantTypeDef } from "./restaurant";
import { User, userResolvers, userTypeDef } from "./user";
import { Address, addressResolvers, addressTypeDef } from "./address";




export const schema = makeExecutableSchema({
    typeDefs: [userTypeDef, menuTypeDef, itemTypeDef, orderTypeDef, restaurantTypeDef, inventoryTypeDef, addressTypeDef],
    resolvers: [itemResolvers, menuResolvers, orderResolvers, restaurantResolvers, addressResolvers, userResolvers],
})

export const models = {
    User, Order, Item, Menu, Restaurant, Inventory, Address
}