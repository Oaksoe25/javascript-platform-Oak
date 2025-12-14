const logger = (req, res, next) => {
  console.log('MY LOGGER =>', req.method, req.url);
  next();
};

module.exports = logger;
