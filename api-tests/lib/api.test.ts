import * as request from 'supertest';

const API_BASE_URL = process.env['API_BASE_URL'] || 'http://localhost:3001';

describe('Customer API', () => {
  describe('Given the App user provides their name', () => {
    const appUserName = 'Jimi Hendrix';
    test('Then their name should be in the response', async () => {
      const response = await request(API_BASE_URL)
      .post('/')
      .send({name: appUserName})
      .set('Accept', 'application/json');
      expect(response.body.name).toEqual(appUserName);
      expect(response.status).toBe(200);
    });
  });
  
});

