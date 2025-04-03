const { ApolloServer, gql } = require('apollo-server');
const { buildFederatedSchema } = require('@apollo/federation');
const { typeDefs, resolvers } = require('./schema'); 

const accounts = [
  { id: '1234', name: 'Sudha Rani', email: 'sudha.rani@example.com', phone: '123-456-7890' }
];

const server = new ApolloServer({
  schema: buildFederatedSchema([{ typeDefs, resolvers }]),
  context: () => ({ accounts })
});

const executeQuery = async (query, variables = {}) => {
  const result = await server.executeOperation({
    query,
    variables
  });
  return result;
};

describe('Account Service Tests', () => {

  it('should return account by id', async () => {
    const GET_ACCOUNT = gql`
      query GetAccount($id: ID!) {
        getAccount(id: $id) {
          id
          name
          email
          phone
        }
      }
    `;

    const result = await executeQuery(GET_ACCOUNT, { id: '1234' });
    expect(result.errors).toBeUndefined();
    expect(result.data.getAccount).toBeDefined();
    expect(result.data.getAccount.id).toEqual('1234');
    expect(result.data.getAccount.name).toEqual('Sudha Rani');
    expect(result.data.getAccount.email).toEqual('sudha.rani@example.com');
  });


  it('should return all accounts', async () => {
    const GET_ACCOUNTS = gql`
      query GetAccounts {
        getAccounts {
          id
          name
          email
          phone
        }
      }
    `;

    const result = await executeQuery(GET_ACCOUNTS);
    expect(result.errors).toBeUndefined();
    expect(result.data.getAccounts).toHaveLength(1);
    expect(result.data.getAccounts[0].name).toEqual('Sudha Rani');
  });

  it('should create a new account', async () => {
    const CREATE_ACCOUNT = gql`
      mutation CreateAccount($name: String!, $email: String!, $phone: String) {
        createAccount(name: $name, email: $email, phone: $phone) {
          id
          name
          email
          phone
        }
      }
    `;

    const newAccountData = {
      name: 'Sarah Sarah',
      email: 'sarah.sarah@example.com',
      phone: '987-654-3210'
    };

    const result = await executeQuery(CREATE_ACCOUNT, newAccountData);
    expect(result.errors).toBeUndefined();
    expect(result.data.createAccount).toBeDefined();
    expect(result.data.createAccount.name).toEqual(newAccountData.name);
    expect(result.data.createAccount.email).toEqual(newAccountData.email);
    expect(result.data.createAccount.phone).toEqual(newAccountData.phone);
    expect(result.data.createAccount.id).toBeDefined();
  });
});
