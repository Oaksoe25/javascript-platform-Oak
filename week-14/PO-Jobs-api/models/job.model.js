exports.getPublicJobs = async () => {
  return [
    { id: 1, title: "Backend Developer" },
    { id: 2, title: "Frontend Developer" },
  ];
};

exports.getAllJobs = async () => {
  return [
    { id: 1, title: "Backend Developer" },
    { id: 2, title: "Frontend Developer" },
  ];
};

exports.createJob = async (data) => {
  return { id: 3, ...data };
};

exports.updateJob = async (id, data) => {
  return { id, ...data };
};

exports.deleteJob = async (id) => {
  return true;
};
