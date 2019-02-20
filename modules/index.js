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
import { BotUsage, botUsageResolvers, botUsageTypeDef } from './botUsage'

export const schema = makeExecutableSchema({
  typeDefs: [
    userTypeDef,
    itemTypeDef,
    orderTypeDef,
    restaurantTypeDef,
    inventoryTypeDef,
    addressTypeDef,
    botUsageTypeDef
  ],
  resolvers: [
    itemResolvers,
    orderResolvers,
    restaurantResolvers,
    addressResolvers,
    userResolvers,
    inventoryResolvers,
    botUsageResolvers
  ],
  schemaDirectives
})

export const models = {
  User,
  Order,
  Item,
  Restaurant,
  Inventory,
  Address,
  BotUsage
}
