// middlewares/auth.js

const auth = (req, res, next) => {
  const role = req.header('Authorization');

  if (!role) {
    return res.status(401).send('Unauthorized 🔒');
  }

  if (role === 'admin') {
    req.user = { id: 1, role: 'admin' };
  } else if (role === 'member') {
    req.user = { id: 2, role: 'member' };
  } else {
    return res.status(403).send('Forbidden 🚫');
  }

  next();
};

const canManageArticle = (req, res, next) => {
  if (req.user.role === 'admin') {
    return next();
  }

  if (req.user.role === 'member' && req.article.authorId === req.user.id) {
    return next();
  }

  return res.status(403).send('Forbidden 🚫');
};

module.exports = { auth, canManageArticle };
