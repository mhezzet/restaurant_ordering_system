import { addUsageValidator, botUsageByUserValidator } from './validators'
import { UserInputError } from 'apollo-server'

async function botUsageByUser(_, args, { models: { BotUsage } }) {
  const { error } = botUsageByUserValidator(args)
  if (error) throw new UserInputError(error.details[0].message)

  const usage = await BotUsage.find({ user: args.userID })

  return usage
}

async function addUsage(_, args, { models: { BotUsage } }) {
  const { error } = addUsageValidator(args)
  if (error) throw new UserInputError(error.details[0].message)

  const usage = await BotUsage.create({ ...args, user: args.userID })

  return usage
}

export default {
  Query: { botUsageByUser },
  Mutation: { addUsage }
}
