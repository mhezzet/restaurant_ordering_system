import { gql } from 'apollo-server'

export default gql`
  extend type Query {
    botUsageByUser(userID: ID!): [BotUsage!]! @admin
  }

  extend type Mutation {
    addUsage(userID: ID!, selectedLang: String, quickReplay: String): BotUsage
  }

  type BotUsage {
    user: ID!
    selectedLang: String
    quickReplay: String
    createdAt: String
  }
`
