import request from 'supertest';
import { app } from '../src/app';

describe('Test Youtube', () => {
  it('Request Fpe1wNTXbJI Moto Gp', async () => {
    return request(app)
      .get("/api/v1/youtube?v=Fpe1wNTXbJI")
      .then(response => {
        expect(response.statusCode).toBe(200)
      })
  });
});