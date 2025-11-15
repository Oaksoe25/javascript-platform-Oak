const { v4: uuid } = require('uuid');
const dayjs = require('dayjs');
const { readJson, writeJson } = require('../utils/fileDb');

const FILE = 'products.json';

// Read all products
const list = () => readJson(FILE);

// Get one product by id
function getById(id) {
  const products = list();
  return products.find(p => p.id === id) || null;
}

// Create new product
function create(payload) {
  const products = list();

  const product = {
    id: uuid(),
    name: payload.name,
    price: Number(payload.price),
    stock: Number(payload.stock ?? 0),
    description: payload.description ?? '',
    // NEW: image filename used in <img src="/images/....">
    image: payload.image || '',          // e.g. "ASUS Zenbook.jpg"
    // NEW: created time (useful later for sorting, etc.)
    createdAt: dayjs().toISOString()
  };

  products.push(product);
  writeJson(FILE, products);
  return product;
}

// Update existing product
function update(id, payload) {
  const products = list();
  const idx = products.findIndex(p => p.id === id);
  if (idx === -1) return null;

  const current = products[idx];

  products[idx] = {
    ...current,
    ...payload,
    // keep numbers as numbers if they are updated
    price:
      payload.price !== undefined ? Number(payload.price) : current.price,
    stock:
      payload.stock !== undefined ? Number(payload.stock) : current.stock
  };

  writeJson(FILE, products);
  return products[idx];
}

// Delete product
function remove(id) {
  const products = list();
  const idx = products.findIndex(p => p.id === id);
  if (idx === -1) return false;

  products.splice(idx, 1);
  writeJson(FILE, products);
  return true;
}

module.exports = { list, getById, create, update, remove };
