import {
  removeItemValidator,
  addItemValidator,
  itemValidator,
  itemsByRestaurantValidator
} from './validator'
import { UserInputError } from 'apollo-server'

async function addItem(_, args, { models: { Item } }) {
  const { error } = addItemValidator(args)
  if (error) throw new UserInputError(error.details[0].message)

  const item = await Item.create({
    ...args.item,
    restaurant: args.restaurantID
  })
  await Item.populate(item, 'restaurant')
  return item
}

async function removeItem(_, args, { models: { Item } }) {
  const { error } = removeItemValidator(args)
  if (error) throw new UserInputError(error.details[0].message)

  const item = await Item.findOneAndRemove({ _id: args.itemID }).populate(
    'restaurant'
  )
  if (!item) throw new UserInputError('no such an Item')

  return item
}

async function item(_, args, { models: { Item } }) {
  const { error } = itemValidator(args)
  if (error) throw new UserInputError(error.details[0].message)

  const item = await Item.findOne({ _id: args.itemID }).populate('restaurant')
  if (!item) throw new UserInputError('no such an Item')

  return item
}

async function itemsByRestaurant(_, args, { models: { Item } }) {
  const { error } = itemsByRestaurantValidator(args)
  if (error) throw new UserInputError(error.details[0].message)

  const items = await Item.find({ restaurant: args.restaurantID }).populate(
    'restaurant'
  )
  return items
}

export default {
  Mutation: {
    addItem,
    removeItem
  },
  Query: {
    item,
    itemsByRestaurant
  }
}
