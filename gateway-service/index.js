const { ApolloServer } = require('apollo-server');
const { ApolloGateway, RemoteGraphQLDataSource } = require('@apollo/gateway');

const gateway = new ApolloGateway({
  serviceList: [
    { name: 'account', url: 'http://localhost:4001' },
    { name: 'devices', url: 'http://localhost:4002' },
  ],
  buildService({ name, url }) {
    return new RemoteGraphQLDataSource({
      url,
    });
  },
});

const server = new ApolloServer({
  gateway,
  subscriptions: false,
  cors: {
    origin: '*',
  },
});

server.listen().then(({ url }) => {
  console.log(`Federation Service running at ${url}`);
});
