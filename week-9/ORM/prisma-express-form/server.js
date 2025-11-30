// server.js
const express = require('express');
const bodyParser = require('body-parser'); // still used for form posts (x-www-form-urlencoded)
const path = require('path');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();

// parse urlencoded (form submit fallback) and json (fetch)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// serve form at root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'form.html'));
});

// handle form submit (supports form-encoded and JSON)
app.post('/submit', async (req, res) => {
  // If JSON body, use it; otherwise body-parser will provide urlencoded values
  const { name, email } = req.body;

  // Basic server-side validation
  if (!name || !email) {
    const payload = { success: false, message: 'Name and email are required.' };
    // Return JSON if request expects JSON
    if (req.headers.accept && req.headers.accept.includes('application/json')) {
      return res.status(400).json(payload);
    }
    return res.status(400).send(payload.message);
  }

  try {
    const user = await prisma.user.create({
      data: { name, email }
    });

    const payload = { success: true, message: `Thanks ${user.name}!`, user: { id: user.id, name: user.name, email: user.email } };

    if (req.headers.accept && req.headers.accept.includes('application/json')) {
      return res.json(payload);
    }
    return res.send(payload.message);
  } catch (err) {
    console.error('Prisma error:', err);
    // Handle unique constraint violation (email)
    if (err && err.code === 'P2002') {
      const payload = { success: false, message: 'That email is already in use.' };
      if (req.headers.accept && req.headers.accept.includes('application/json')) {
        return res.status(409).json(payload);
      }
      return res.status(409).send(payload.message);
    }

    const payload = { success: false, message: 'Internal server error.' };
    if (req.headers.accept && req.headers.accept.includes('application/json')) {
      return res.status(500).json(payload);
    }
    return res.status(500).send(payload.message);
  }
});

// list users (for debugging)
app.get('/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany({ orderBy: { id: 'desc' } });
    res.json(users);
  } catch (err) {
    console.error('Fetch users error:', err);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// graceful shutdown
async function shutdown() {
  console.log('Shutting down, disconnecting Prisma...');
  await prisma.$disconnect();
  process.exit(0);
}
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running: http://localhost:${PORT}`));
