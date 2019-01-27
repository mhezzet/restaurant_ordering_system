import { makeExecutableSchema } from 'apollo-server'
import schemaDirectives from '../directives'
import { Inventory, inventoryTypeDef, inventoryResolvers } from './inventory'
import { Item, itemResolvers, itemTypeDef } from './item'
import { Order, orderResolvers, orderTypeDef } from './order'
import {
  Restaurant,
  restaurantResolvers,
  restaurantTypeDef
} from './restaurant'
import { User, userResolvers, userTypeDef } from './user'
import { Address, addressResolvers, addressTypeDef } from './address'

export const schema = makeExecutableSchema({
  typeDefs: [
    userTypeDef,
    itemTypeDef,
    orderTypeDef,
    restaurantTypeDef,
    inventoryTypeDef,
    addressTypeDef
  ],
  resolvers: [
    itemResolvers,
    orderResolvers,
    restaurantResolvers,
    addressResolvers,
    userResolvers,
    inventoryResolvers
  ],
  schemaDirectives
})

export const models = {
  User,
  Order,
  Item,
  Restaurant,
  Inventory,
  Address
}
