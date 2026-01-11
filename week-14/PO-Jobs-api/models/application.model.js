exports.applyJob = async (userId, jobId) => {
  return {
    id: 1,
    userId,
    jobId,
    status: "applied",
  };
};

exports.getAllApplications = async () => {
  return [{ id: 1, userId: 2, jobId: 1 }];
};

exports.getMyApplications = async (userId) => {
  return [{ id: 1, userId, jobId: 1 }];
};
