const express = require('express');
const router = express.Router();
const { auth, canManageArticle } = require('../middlewares/auth');

let articles = [
  { id: 1, title: 'Admin article', authorId: 1 },
  { id: 2, title: 'Member article', authorId: 2 }
];

router.get('/', (req, res) => {
  res.json(articles);
});

const loadArticle = (req, res, next) => {
  const article = articles.find(a => a.id == req.params.id);
  if (!article) return res.status(404).send('Not found');
  req.article = article;
  next();
};

router.post('/', auth, (req, res) => {
  const newArticle = {
    id: articles.length + 1,
    title: req.body.title,
    authorId: req.user.id
  };
  articles.push(newArticle);
  res.json(newArticle);
});

router.put('/:id', auth, loadArticle, canManageArticle, (req, res) => {
  req.article.title = req.body.title;
  res.json(req.article);
});

router.delete('/:id', auth, loadArticle, canManageArticle, (req, res) => {
  articles = articles.filter(a => a.id !== req.article.id);
  res.send('Deleted');
});

module.exports = router;
