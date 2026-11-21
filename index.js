import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

// 1. Define your schema
const typeDefs = `#graphql
  type Query {
    hello: String
    name: String
  }
`;

// 2. Define your resolvers
const resolvers = {
  Query: {
    hello: () => 'Hello world!',
    name: () => "Hello Azis!"
  },
};

// 3. Start the server
const server = new ApolloServer({ typeDefs, resolvers });
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀 Server ready at: ${url}`);

