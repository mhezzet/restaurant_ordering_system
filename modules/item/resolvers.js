import {
  removeItemValidator,
  addItemValidator,
  itemValidator,
  itemsByRestaurantValidator,
  addPriceValidator,
  addOnValidator
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

async function addPrice(_, args, { models: { Item } }) {
  const { error } = addPriceValidator(args)
  if (error) throw new UserInputError(error.details[0].message)

  const item = await Item.findOneAndUpdate(
    { _id: args.itemID },
    { $push: { prices: args.price } },
    { new: true }
  ).populate('restaurant')

  if (!item) throw new UserInputError('no such an item')

  return item
}

async function addAddOn(_, args, { models: { Item } }) {
  const { error } = addOnValidator(args)
  if (error) throw new UserInputError(error.details[0].message)

  const item = await Item.findOneAndUpdate(
    { _id: args.itemID },
    { $push: { addOns: args.addOn } },
    { new: true }
  ).populate('restaurant')
  if (!item) throw new UserInputError('no such an item')

  return item
}

export default {
  Mutation: {
    addItem,
    removeItem,
    addPrice,
    addAddOn
  },
  Query: {
    item,
    itemsByRestaurant
  }
}
