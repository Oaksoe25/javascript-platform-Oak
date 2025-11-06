const { v4: uuid } = require('uuid');
const dayjs = require('dayjs');
const { readJson, writeJson } = require('../utils/fileDb');
const FILE = 'users.json';

const list = () => readJson(FILE);
const getById = id => list().find(u => u.id === id) || null;
const create = payload => {
  const data = list();
  const user = { id: uuid(), name: payload.name, email: payload.email };
  data.push(user); writeJson(FILE, data); return user;
};
module.exports = { list, getById, create };
