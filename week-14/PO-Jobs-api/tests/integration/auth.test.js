const request = require("supertest");
const app = require("../../app");

describe("Auth Integration Test", () => {
  it("login success", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "admin@test.com", password: "123" });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });
});
