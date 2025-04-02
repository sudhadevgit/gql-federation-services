const { gql } = require('apollo-server');

// Sample device data
let devices = [
  { id: '5678', name: "Sudha's iPhone", type: 'smartphone', status: 'active', accountId: '1234' },
  { id: '91011', name: "Sudha's Laptop", type: 'laptop', status: 'active', accountId: '1234' }
];

const typeDefs = gql`
  input CreateDeviceInput {
    accountId: ID!
    name: String!
    type: String!
    status: String!
  }

  type Device @key(fields: "id") {
    id: ID!
    name: String!
    type: String!
    status: String!
    accountId: ID!
    account: Account
  }

  extend type Account @key(fields: "id") {
    id: ID! @external
    devices: [Device]
  }

  extend type Query {
    getDevice(id: ID!): Device
    getDevicesByAccount(accountId: ID!): [Device]
  }

  extend type Mutation {
    createDevice(input: CreateDeviceInput!): Device
  }
`;

const resolvers = {
  Device: {
    __resolveReference: (device) => devices.find(d => d.id === device.id),
    account: (device) => ({ __typename: "Account", id: device.accountId })
  },
  Account: {
    devices: (account) => devices.filter(device => device.accountId === account.id)
  },
  Query: {
    getDevice: (_, { id }) => devices.find(device => device.id === id),
    getDevicesByAccount: (_, { accountId }) => devices.filter(device => device.accountId === accountId),
  },
  Mutation: {
    createDevice: (_, { input }) => {
      const newDevice = {
        id: `${Math.floor(Math.random() * 1000)}`,
        name: input.name,
        type: input.type,
        status: input.status,
        accountId: input.accountId
      };
      devices.push(newDevice);
      return newDevice;
    }
  }
};

module.exports = { typeDefs, resolvers };