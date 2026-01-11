const Job = require("../models/job.model");

exports.getPublicJobs = async (req, res) => {
  const jobs = await Job.getPublicJobs();
  res.json(jobs);
};

exports.getAllJobs = async (req, res) => {
  const jobs = await Job.getAllJobs();
  res.json(jobs);
};

exports.createJob = async (req, res) => {
  const job = await Job.createJob(req.body);
  res.status(201).json(job);
};

exports.updateJob = async (req, res) => {
  const job = await Job.updateJob(req.params.id, req.body);
  res.json(job);
};

exports.deleteJob = async (req, res) => {
  await Job.deleteJob(req.params.id);
  res.json({ message: "Job deleted" });
};
