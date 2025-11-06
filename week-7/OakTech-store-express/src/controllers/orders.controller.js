const { v4: uuid } = require('uuid');
const dayjs = require('dayjs');
const { readJson, writeJson } = require('../utils/fileDb');
const FILE = 'orders.json';

const list = () => readJson(FILE);
const getById = id => list().find(o => o.id === id) || null;
const create = payload => {
  const data = list();
  const order = {
    id: uuid(),
    userId: payload.userId,
    items: payload.items || [],
    total: Number(payload.total || 0),
    status: payload.status || 'PENDING'
  };
  data.push(order); writeJson(FILE, data); return order;
};
module.exports = { list, getById, create };
