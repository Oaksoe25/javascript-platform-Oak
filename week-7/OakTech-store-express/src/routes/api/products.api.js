const express = require('express');
const { validationResult } = require('express-validator');
const ctrl = require('../../controllers/products.controller');
const { idParam, productCreateRules, productUpdateRules } = require('../../utils/validators');

const router = express.Router();

router.get('/', (req, res) => res.json(ctrl.list()));

router.get('/:id', idParam, (req, res) => {
  const item = ctrl.getById(req.params.id);
  if (!item) return res.status(404).json({ error: 'Product not found' });
  res.json(item);
});

router.post('/', productCreateRules, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const created = ctrl.create(req.body);
  res.status(201).json(created);
});

router.put('/:id', productUpdateRules, (req, res) => {
  const updated = ctrl.update(req.params.id, req.body);
  if (!updated) return res.status(404).json({ error: 'Product not found' });
  res.json(updated);
});

router.delete('/:id', (req, res) => {
  const ok = ctrl.remove(req.params.id);
  if (!ok) return res.status(404).json({ error: 'Product not found' });
  res.json({ success: true });
});

module.exports = router;
