const { getPublicJobs } = require("../../controllers/job.controller");

describe("Job Controller Unit Test", () => {
  it("should return public jobs", async () => {
    const req = {};
    const res = { json: jest.fn() };

    await getPublicJobs(req, res);

    expect(res.json).toHaveBeenCalled();
  });
});
