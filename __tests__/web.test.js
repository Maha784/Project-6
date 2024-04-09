// __tests__/web.test.js

const request = require('supertest');
const app = require('../web');
const business = require('../business');

// Mocking the business module
jest.mock('../business', () => ({
  checkLogin: jest.fn().mockImplementation((email, password) => {
    console.log('Mock checkLogin called with email:', email, 'and password:', password); // Log the arguments passed to the mock
    if (email === 'user1@gmail.com' && password === '1234') {
      return Promise.resolve({ email: 'user1@gmail.com', name: 'User' });
    } else {
      return Promise.resolve(null);
    }
  }),
  startSession: jest.fn().mockResolvedValue('mockSessionId'),
  getSessionData: jest.fn().mockResolvedValue({ SessionKey: 'mockSessionId', Data: { Username: 'User' } })
}));

describe('POST /login', () => {
  test('responds with a redirect on successful login using user1@gmail.com and 1234', async () => {
    const response = await request(app)
      .post('/login')
      .send('email=user1%40gmail.com&password=1234') // URL-encoded form data
      .set('Content-Type', 'application/x-www-form-urlencoded');

    console.log('Response Status:', response.statusCode); // Log the response status code
    console.log('Response Headers:', response.headers); // Log the response headers

    expect(response.statusCode).toBe(302);
    expect(response.headers.location).toContain('/dashboard');
    expect(business.checkLogin).toHaveBeenCalledWith('user1@gmail.com', '1234');
  });
});
