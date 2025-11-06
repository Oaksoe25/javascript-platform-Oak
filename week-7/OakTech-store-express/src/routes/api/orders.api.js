const express = require('express');
const ctrl = require('../../controllers/orders.controller');
const router = express.Router();
router.get('/', (req, res) => res.json(ctrl.list()));
router.get('/:id', (req, res) => {
  const o = ctrl.getById(req.params.id);
  if (!o) return res.status(404).json({ error: 'Order not found' });
  res.json(o);
});
router.post('/', (req, res) => res.status(201).json(ctrl.create(req.body)));
module.exports = router;
