/**
|--------------------------------------------------
| Register Local
|--------------------------------------------------
*/
async function registerLocal(_, args, { models: { User } }) {
  const user = await User.create({ ...args })

  return user
}

export default {
  Mutation: {
    registerLocal
  }
}
