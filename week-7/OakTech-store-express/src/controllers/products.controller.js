const { v4: uuid } = require('uuid');
const dayjs = require('dayjs');
const { readJson, writeJson } = require('../utils/fileDb');

const FILE = 'products.json';

const list = () => readJson(FILE);
function getById(id) {
  return list().find(p => p.id === id) || null;
}
function create(payload) {
  const products = list();
  const product = {
    id: uuid(),
    name: payload.name,
    price: Number(payload.price),
    stock: Number(payload.stock ?? 0),
    description: payload.description ?? ''
  };
  products.push(product);
  writeJson(FILE, products);
  return product;
}
function update(id, payload) {
  const products = list();
  const idx = products.findIndex(p => p.id === id);
  if (idx === -1) return null;
  products[idx] = { ...products[idx], ...payload };
  writeJson(FILE, products);
  return products[idx];
}
function remove(id) {
  const products = list();
  const idx = products.findIndex(p => p.id === id);
  if (idx === -1) return false;
  products.splice(idx, 1);
  writeJson(FILE, products);
  return true;
}
// ...top unchanged
function create(payload) {
  const products = list();
  const product = {
    id: uuid(),
    name: payload.name,
    price: Number(payload.price),
    stock: Number(payload.stock ?? 0),
    description: payload.description ?? '',
    image: payload.image || '',          // <-- add this
    createdAt: dayjs().toISOString()
  };
  products.push(product);
  writeJson(FILE, products);
  return product;
}

function update(id, payload) {
  const products = list();
  const idx = products.findIndex(p => p.id === id);
  if (idx === -1) return null;
  products[idx] = { ...products[idx], ...payload }; // includes image if provided
  writeJson(FILE, products);
  return products[idx];
}


module.exports = { list, getById, create, update, remove };
