// __tests__/business.test.js

const business = require('../business');
jest.mock('../persistence', () => ({
  getUserDetails: jest.fn(email => {
    if (email === 'user1@gmail.com') {
      return Promise.resolve({ email: 'user1@gmail.com', password: '1234' });
    }
    return Promise.resolve(null);
  })
}));

describe('checkLogin', () => {
  test('returns user data for valid credentials', async () => {
    const result = await business.checkLogin('user1@gmail.com', '1234');
    expect(result).toEqual({ email: 'user1@gmail.com', password: '1234' });
  });

  test('returns undefined for invalid credentials', async () => {
    const result = await business.checkLogin('user1@gmail.com', 'wrongpassword');
    expect(result).toBeUndefined();
  });
});
