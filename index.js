import { ApolloServer } from "apollo-server";
import { schema } from "./modules";

const server = new ApolloServer({
    schema, mocks: true,
})


server.listen().then(({ url }) => {
    console.log(`server is listening @${url}`)
})