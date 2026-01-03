const Job = require("../models/job.model");

exports.publicList = (req, res) => {
  Job.getAll((_, jobs) => res.json(jobs));
};

exports.detail = (req, res) => {
  Job.getById(req.params.id, (_, job) => res.json(job[0]));
};

exports.create = (req, res) => {
  Job.create(req.body, () => res.json({ message: "Job created" }));
};
