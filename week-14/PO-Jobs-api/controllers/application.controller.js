const Application = require("../models/application.model");

exports.applyJob = async (req, res) => {
  const { jobId } = req.body;
  const result = await Application.applyJob(req.user.id, jobId);
  res.status(201).json(result);
};

exports.getAllApplications = async (req, res) => {
  const apps = await Application.getAllApplications();
  res.json(apps);
};

exports.getMyApplications = async (req, res) => {
  const apps = await Application.getMyApplications(req.user.id);
  res.json(apps);
};
