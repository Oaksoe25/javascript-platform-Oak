const express = require('express');
const orders = require('../../controllers/orders.controller');
const products = require('../../controllers/products.controller');
const users = require('../../controllers/users.controller');
const router = express.Router();

router.get('/orders', (req, res) =>
  res.render('orders/list', { title: 'Orders', items: orders.list() })
);

// New order form (needs products + users to choose from)
router.get('/orders/new', (req, res) => {
  res.render('orders/form', {
    title: 'Create Order',
    users: users.list(),
    products: products.list()
  });
});

router.post('/orders/new', (req, res) => {
  // req.body: userId, productId, qty
  const qty = Number(req.body.qty || 1);
  const product = products.getById(req.body.productId);
  const total = product ? product.price * qty : 0;
  const created = orders.create({
    userId: req.body.userId,
    items: [{ productId: req.body.productId, qty }],
    total,
    status: 'PAID'
  });
  res.redirect('/orders');
});

module.exports = router;
