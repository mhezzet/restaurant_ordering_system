import {
  removeItemValidator,
  addItemValidator,
  itemValidator
} from './validator'
import { UserInputError } from 'apollo-server'

async function addItem(_, args, { models: { Item } }) {
  const { error } = addItemValidator(args)
  if (error) throw new UserInputError(error.details[0].message)

  const item = await Item.create({
    ...args.item,
    restaurant: args.restaurantID
  })
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

export default {
  Mutation: {
    addItem,
    removeItem
  },
  Query: {
    item
  }
}
