import {
  addressValidator,
  addAddressValidator,
  updateAddressValidator,
  deleteAddressValidator
} from './validators'
import { UserInputError } from 'apollo-server'

/**
|--------------------------------------------------
| Address
|--------------------------------------------------
*/
async function address(_, args, { models: { Address } }) {
  const { error } = addressValidator(args)
  if (error) throw new UserInputError(error.details[0].message)

  const address = await Address.findOne({
    _id: args.addressID
  }).populate('user')
  if (!address) throw new UserInputError('no such an address')

  return address
}

/**
|--------------------------------------------------
| addresses
|--------------------------------------------------
*/
async function addresses(
  _,
  args,
  { models: { Address }, user: requestedUser }
) {
  const addresses = await Address.find({ user: requestedUser.id })
  return addresses
}

/**
|--------------------------------------------------
| Add Address
|--------------------------------------------------
*/
async function addAddress(
  _,
  args,
  { models: { Address }, user: requestedUser }
) {
  const { error } = addAddressValidator(args.address)
  if (error) throw new UserInputError(error.details[0].message)

  const address = await Address.create({
    user: requestedUser.id,
    ...args.address
  })

  return address
}

/**
|--------------------------------------------------
| Update Address
|--------------------------------------------------
*/
async function updateAddress(
  _,
  args,
  { models: { Address }, user: requestedUser }
) {
  const { error } = updateAddressValidator(args.address)
  if (error) throw new UserInputError(error.details[0].message)

  const address = await findOneAndUpdate(
    { _id: args.addressID, user: requestedUser.id },
    {
      $set: {
        ...args.address
      }
    },
    { new: true }
  )
  if (!address) throw new UserInputError('no such an address')
  return address
}

/**
|--------------------------------------------------
| Delete Address
|--------------------------------------------------
*/
async function deleteAddress(
  _,
  args,
  { models: { Address }, user: requestedUser }
) {
  const { error } = deleteAddressValidator(args)
  if (error) throw new UserInputError(error.details[0].message)

  const address = await Address.findOneAndRemove({
    _id: args.addressID,
    user: requestedUser.id
  })
  if (!address) throw new UserInputError('no such an address')

  return address
}

export default {
  Query: {
    address,
    addresses
  },
  Mutation: {
    addAddress,
    updateAddress,
    deleteAddress
  }
}
