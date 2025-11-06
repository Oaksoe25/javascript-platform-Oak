const express = require('express');
const ctrl = require('../../controllers/users.controller');
const router = express.Router();

router.get('/users', (req, res) => res.render('users/list', { title: 'Users', items: ctrl.list() }));

router.get('/users/new', (req, res) => {
  res.render('users/form', { title: 'Add User' });
});

router.post('/users/new', (req, res) => {
  const user = ctrl.create(req.body);
  res.redirect('/users');
});

module.exports = router;
