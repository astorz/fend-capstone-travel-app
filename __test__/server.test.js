import app from '../src/server/server';
const request = require("supertest");

describe("Testing the root path", () => {
  test("Should return status 200", () => {
    return request(app)
      .get("/")
      .expect(200);
  });
});