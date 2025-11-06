const express = require('express');
const path = require('path');
const multer = require('multer');
const ctrl = require('../../controllers/products.controller');

const router = express.Router();

// storage: save into public/images with unique filename
const storage = multer.diskStorage({
  destination: path.join(__dirname, '../../../public/images'),
  filename: (_req, file, cb) => {
    const safe = Date.now() + '-' + file.originalname.replace(/\s+/g, '-');
    cb(null, safe);
  }
});
const upload = multer({ storage });

// list + detail unchanged...
router.get('/products', (req, res) => {
  res.render('products/list', { title: 'Products', items: ctrl.list() });
});
router.get('/product/:id', (req, res) => {
  const item = ctrl.getById(req.params.id);
  if (!item) return res.status(404).send('Product not found');
  res.render('products/detail', { title: item.name, item });
});

// new product (form)
router.get('/products/new', (req, res) => {
  res.render('products/form', { title: 'Add Product', item: null });
});

// handle create with image upload (field name: "photo")
router.post('/products/new', upload.single('photo'), (req, res) => {
  const image = req.file ? req.file.filename : ''; // saved filename
  const created = ctrl.create({ ...req.body, image });
  res.redirect(`/product/${created.id}`);
});

module.exports = router;
