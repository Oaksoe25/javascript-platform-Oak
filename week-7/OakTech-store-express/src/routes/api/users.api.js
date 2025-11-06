const express = require('express');
const ctrl = require('../../controllers/users.controller');
const router = express.Router();
router.get('/', (req, res) => res.json(ctrl.list()));
router.get('/:id', (req, res) => {
  const u = ctrl.getById(req.params.id);
  if (!u) return res.status(404).json({ error: 'User not found' });
  res.json(u);
});
router.post('/', (req, res) => res.status(201).json(ctrl.create(req.body)));
module.exports = router;
