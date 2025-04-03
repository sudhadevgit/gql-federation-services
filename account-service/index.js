const { ApolloServer } = require('apollo-server');
const { buildFederatedSchema } = require('@apollo/federation');
const { typeDefs, resolvers } = require('./schema');

const server = new ApolloServer({
    schema: buildFederatedSchema([{ typeDefs, resolvers }])
  });
  
  server.listen({ port: 4001 }).then(({ url }) => {
    console.log(`Account service ready at ${url}`);
  });
