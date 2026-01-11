const request = require("supertest");
const app = require("../../app");

let token;

beforeAll(async () => {
  const res = await request(app)
    .post("/api/auth/login")
    .send({ email: "admin@test.com", password: "123" });

  token = res.body.token;
});

describe("Job Integration Test", () => {
  it("get public jobs", async () => {
    const res = await request(app).get("/api/jobs/public");
    expect(res.statusCode).toBe(200);
  });

  it("create job", async () => {
    const res = await request(app)
      .post("/api/jobs")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "New Job" });

    expect(res.statusCode).toBe(201);
  });
});
it("member cannot create job", async () => {
  const login = await request(app)
    .post("/api/auth/login")
    .send({ email: "member@test.com", password: "123" });

  const res = await request(app)
    .post("/api/jobs")
    .set("Authorization", `Bearer ${login.body.token}`)
    .send({ title: "Illegal Job" });

  expect(res.statusCode).toBe(403);
});
