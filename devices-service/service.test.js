const { ApolloServer, gql } = require('apollo-server');
const { buildFederatedSchema } = require('@apollo/federation');
const { typeDefs, resolvers } = require('./schema'); 

const devices = [
  { id: '5678', name: "Sudha's iPhone", type: 'smartphone', status: 'active', accountId: '1234' },
  { id: '91011', name: "Sudha's Laptop", type: 'laptop', status: 'active', accountId: '1234' }
];

const server = new ApolloServer({
  schema: buildFederatedSchema([{ typeDefs, resolvers }]),
  context: () => ({ devices })
});

const executeQuery = async (query, variables = {}) => {
  const result = await server.executeOperation({
    query,
    variables
  });
  return result;
};

describe('Device Service Tests', () => {

  it('should return a device by id', async () => {
    const GET_DEVICE = gql`
      query GetDevice($id: ID!) {
        getDevice(id: $id) {
          id
          name
          type
          status
          accountId
        }
      }
    `;

    const result = await executeQuery(GET_DEVICE, { id: '5678' });
    expect(result.errors).toBeUndefined();
    expect(result.data.getDevice).toBeDefined();
    expect(result.data.getDevice.id).toEqual('5678');
    expect(result.data.getDevice.name).toEqual("Sudha's iPhone");
    expect(result.data.getDevice.type).toEqual('smartphone');
    expect(result.data.getDevice.status).toEqual('active');
  });


  it('should return all devices for a given accountId', async () => {
    const GET_DEVICES_BY_ACCOUNT = gql`
      query GetDevicesByAccount($accountId: ID!) {
        getDevicesByAccount(accountId: $accountId) {
          id
          name
          type
          status
        }
      }
    `;

    const result = await executeQuery(GET_DEVICES_BY_ACCOUNT, { accountId: '1234' });
    expect(result.errors).toBeUndefined();
    expect(result.data.getDevicesByAccount[0].name).toEqual("Sudha's iPhone");
    expect(result.data.getDevicesByAccount[1].name).toEqual("Sudha's Laptop");
  });


  it('should create a new device', async () => {
    const CREATE_DEVICE = gql`
      mutation CreateDevice($input: CreateDeviceInput!) {
        createDevice(input: $input) {
          id
          name
          type
          status
          accountId
        }
      }
    `;

    const newDeviceData = {
      accountId: '1234',
      name: 'Sudha\'s Tablet',
      type: 'tablet',
      status: 'inactive'
    };

    const result = await executeQuery(CREATE_DEVICE, { input: newDeviceData });
    expect(result.errors).toBeUndefined();
    expect(result.data.createDevice).toBeDefined();
    expect(result.data.createDevice.name).toEqual(newDeviceData.name);
    expect(result.data.createDevice.type).toEqual(newDeviceData.type);
    expect(result.data.createDevice.status).toEqual(newDeviceData.status);
    expect(result.data.createDevice.accountId).toEqual(newDeviceData.accountId);
    expect(result.data.createDevice.id).toBeDefined();
  });


  it('should resolve device reference correctly', () => {
    const deviceReference = { __typename: 'Device', id: '5678' };
    const result = resolvers.Device.__resolveReference(deviceReference);
    expect(result).toBeDefined();
    expect(result.id).toEqual('5678');
    expect(result.name).toEqual("Sudha's iPhone");
  });


  it('should return devices for the account', () => {
    const account = { id: '1234' };
    const result = resolvers.Account.devices(account);
    expect(result[0].name).toEqual("Sudha's iPhone");
    expect(result[1].name).toEqual("Sudha's Laptop");
  });
});
