import { createInventoryValidator, inventoryValidator } from './validators'
import { UserInputError } from 'apollo-server'

async function createInventory(_, args, { models: { Inventory } }) {
  const { error } = createInventoryValidator(args)
  if (error) throw new UserInputError(error.details[0].message)

  const inventory = await Inventory.create(args)
  return inventory
}

async function inventory(_, args, { models: { Inventory } }) {
  const { error } = inventoryValidator(args)
  if (error) throw new UserInputError(error.details[0].message)

  const inventory = await Inventory.findOne({ _id: args.inventoryID }).populate(
    'items'
  )
  return inventory
}

export default {
  Mutation: {
    createInventory
  },
  Query: {
    inventory
  }
}
