const Application = require("../models/application.model");

exports.apply = (req, res) => {
  Application.apply(req.user.id, req.params.jobId, () => {
    res.json({ message: "Applied successfully" });
  });
};
