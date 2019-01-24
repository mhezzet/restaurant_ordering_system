import { SchemaDirectiveVisitor, AuthenticationError } from 'apollo-server'
import { defaultFieldResolver } from 'graphql'

export default class AdminDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field
    field.resolve = function(...args) {
      const [_, __, { user }] = args

      if (!user || !user.roles.includes('CASHIER'))
        throw new AuthenticationError('Access denied, you are not an cashier')

      return resolve.apply(this, args)
    }
  }
}
