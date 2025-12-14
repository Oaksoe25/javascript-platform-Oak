const auth = (req, res, next) => {
  const token = req.header('Authorization');
  console.log('Authorization header =', token);

  if (!token) {
    return res.status(401).send('Unauthorized 🔒 (no token)');
  }

  if (token !== '123') {
    return res.status(403).send('Forbidden 🚫 (wrong token)');
  }

  next();
};

module.exports = auth;
