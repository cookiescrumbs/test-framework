import * as request from 'supertest';

const API_BASE_URL = process.env['API_BASE_URL'] || 'http://localhost:3001';

const appUserName = 'Jimi Hendrix';

let response: any;

beforeAll(async() => {
  response = await request(API_BASE_URL)
    .post('/')
    .send({ name: appUserName })
    .set('Accept', 'application/json');
});

describe('Customer API', () => {
  describe('Scenario: App user provides their name', () => {
    describe('Given the App user provides their name', () => {
      test('Then their name should be in the response', async () => {
        expect(response.body.name).toEqual(appUserName);
      });
    });
  });

  describe('Scenario: Contact info is not in the system', () => {
    describe('When the customer\'s contact information is not in the system', () => {
      test('Then no information should be shown', async () => {
          expect(response.body.customers[6]).not.toHaveProperty('contactInfo')
      });
    });
  });

  describe('Scenario: A small company', () => {
    describe('When the number of employees is 10 or less', () => {
        test('Then the company is considered Small', async () => {
            expect(response.body.customers[0].size.toLowerCase()).toEqual('smallsss');
            expect(response.body.customers[1].size.toLowerCase()).toEqual('small');
        });
    });  
  });

  describe('Scenario: A medium company', () => {
    describe('When the number of employees is 1000 or less', () => {
      test('Then the company is considered Medium', async () => {
        expect(response.body.customers[2].size.toLowerCase()).toEqual('medium');
        expect(response.body.customers[3].size.toLowerCase()).toEqual('medium');
      });
    });
  });

  describe('Scenario: A big company', () => {
    describe('When the number of employees is greater than 1000', () => {
      test('Then the company is considered Big', async () => {
        expect(response.body.customers[4].size.toLowerCase()).toEqual('big');
        expect(response.body.customers[5].size.toLowerCase()).toEqual('big');
      });
    });
  });
});
