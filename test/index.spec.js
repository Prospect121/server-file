import app from '../src/index';
import request from 'supertest';

describe('POST /api/new-data', () => {
  const data = {
    route: './src/data.txt',
    data: {
      name: 'This is a test',
    },
  };
  test('Should return status 200', async () => {
    const response = await request(app).post('/api/new-data').send(data);
    expect(response.status).toBe(200);
  });

  test('Should return status 400', async () => {
    const response = await request(app).post('/api/new-data').send();
    expect(response.status).toBe(400);
  });
});

describe('POST /api/new-data', () => {
  const data = {
    route: '',
    data: {
      name: 'This is a test',
    },
  };

  test('Should return status 404', async () => {
    const response = await request(app).post('/api/new-data').send(data);
    expect(response.status).toBe(404);
  });
});
