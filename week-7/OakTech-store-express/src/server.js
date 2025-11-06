// src/server.js
const path = require('path');
const express = require('express');

const app = express(); // create app FIRST

// Always use the port provided by the host (Railway)
const PORT = Number(process.env.PORT || 3000);
console.log('Startup → env.PORT =', process.env.PORT);
console.log('Startup → final PORT used =', PORT);

// --- middleware ---
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

// --- views (EJS) ---
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Tiny layout helper so <% layout('layouts/main') %> works
app.use((req, res, next) => {
  res.locals.layout = (name) => { res.locals.__layout = name; };
  const render = res.render.bind(res);
  res.render = (view, params = {}) => {
    render(view, params, (err, html) => {
      if (err) return res.status(500).send(err.message);
      const layout = res.locals.__layout || 'layouts/main';
      render(layout, { ...params, body: html }, (err2, out) => {
        if (err2) return res.status(500).send(err2.message);
        res.send(out);
      });
    });
  };
  next();
});

// --- web routes (HTML) ---
app.use('/', require('./routes/web/index.routes'));
app.use('/', require('./routes/web/products.routes'));
app.use('/', require('./routes/web/users.routes'));
app.use('/', require('./routes/web/orders.routes'));

// --- API routes (JSON under /api) ---
app.use('/api/products', require('./routes/api/products.api'));
app.use('/api/users', require('./routes/api/users.api'));
app.use('/api/orders', require('./routes/api/orders.api'));

// --- 404 handlers ---
app.use((req, res) => {
  if (req.path.startsWith('/api/')) return res.status(404).json({ error: 'Not found' });
  res.status(404).send('Page not found');
});

// ✅ ONE listen, at the end
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
