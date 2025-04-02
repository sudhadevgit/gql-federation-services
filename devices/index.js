const { ApolloServer } = require('apollo-server');
const { buildFederatedSchema } = require('@apollo/federation');
const { typeDefs, resolvers } = require('./schema');

const server = new ApolloServer({
    schema: buildFederatedSchema([{ typeDefs, resolvers }])
  });
  
  server.listen({ port: 4002 }).then(({ url }) => {
    console.log(`Device service ready at ${url}`);
  });
