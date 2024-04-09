// __tests__/persistence.test.js

const mongodb = require('mongodb');
const persistence = require('../persistence');

jest.mock('mongodb', () => {
    const mockCollection = {
      findOne: jest.fn().mockResolvedValue({ email: 'user1@gmail.com', password: '1234' }),
    };
    const mockDb = {
      collection: jest.fn().mockReturnValue(mockCollection)
    };
    const mockClient = {
      connect: jest.fn(),
      db: jest.fn().mockReturnValue(mockDb),
    };
    return { MongoClient: jest.fn().mockReturnValue(mockClient) };
  });
  

describe('getUserDetails', () => {
  test('successfully fetches user details', async () => {
    const email = 'user1@gmail.com';
    const userDetails = await persistence.getUserDetails(email);

    expect(userDetails).toEqual({ email, password: '1234' });
    expect(mongodb.MongoClient().db().collection().findOne).toHaveBeenCalledWith({ email });
  });
});
