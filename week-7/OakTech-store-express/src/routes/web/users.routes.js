const express = require('express');
const ctrl = require('../../controllers/users.controller');

const router = express.Router();

router.get('/users', (req, res) => {
  res.render('users/list', {
    title: 'Users',
    page: 'users',
    users: ctrl.list()    // <-- important: name it "users"
  });
});

module.exports = router;
