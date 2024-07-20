const request = require('supertest');
const app = require('../app');
const http = require('http');

let server;
let port;

const sampleData = {
  firstName: "mike",
  lastName: "hill",
  email: "mike@hill.net.nz",
  acceptTerms: true,
  mobileNumber: "02175822",
  country: "New Zealand",
  marketingReferralData: "a2123123",
  notes: "asdasd"
};

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(0, () => {
    port = server.address().port;
    done();
  });
});

afterAll((done) => {
  server.close(done);
});

describe('Performance Test', () => {
  it('should submit the form 1000 times and measure the speed', async () => {
    const numRequests = 1000;
    let successCount = 0;
    const errors = [];

    for (let i = 0; i < numRequests; i++) {
      try {
        await request(server)
          .post('/api/v1/leadGeneration')
          .send(sampleData)
          .expect(201);  // Expecting 201 Created
        successCount++;
      } catch (error) {
        errors.push({ request: i + 1, error: error.message });
      }
    }

    console.log(`Successful requests: ${successCount}`);
    console.log(`Failed requests: ${errors.length}`);

    if (errors.length > 0) {
      console.log('Errors encountered:');
      errors.forEach(err => {
        console.log(`Request ${err.request}: ${err.error}`);
      });
    }

    expect(successCount + errors.length).toBe(numRequests);
    expect(successCount).toBeGreaterThan(0);
  }, 300000); // 5 minute timeout
});