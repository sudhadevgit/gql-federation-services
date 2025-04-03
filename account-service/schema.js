const { gql } = require('apollo-server');

// Sample Account data
let accounts = [
  { id: '1234', name: 'Sudha Rani', email: 'sudha.rani@example.com', phone: '123-456-7890' }
];

const typeDefs = gql`
  type Account @key(fields: "id") {
    id: ID!
    name: String!
    email: String!
    phone: String
  }

  extend type Query {
    getAccount(id: ID!): Account
    getAccounts: [Account]
  }

  extend type Mutation {
    createAccount(name: String!, email: String!, phone: String): Account
  }
`;

const resolvers = {
  Account: {
    __resolveReference: (account) => accounts.find(a => a.id === account.id)
  },
  Query: {
    getAccount: (_, { id }) => accounts.find(account => account.id === id),
    getAccounts: () => accounts
  },
  Mutation: {
    createAccount: (_, { name, email, phone }) => {
      const newAccount = {
        id: `${Math.floor(Math.random() * 1000)}`,
        name,
        email,
        phone
      };
      accounts.push(newAccount);
      return newAccount;
    }
  }
};

module.exports = { typeDefs, resolvers };