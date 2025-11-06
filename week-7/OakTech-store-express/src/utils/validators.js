const { body, param } = require('express-validator');

const idParam = param('id').isString().trim().notEmpty();

const productCreateRules = [
  body('name').isString().trim().notEmpty(),
  body('price').isFloat({ gt: 0 }),
  body('stock').isInt({ min: 0 }),
  body('description').optional().isString()
];

const productUpdateRules = [
  body('name').optional().isString().trim().notEmpty(),
  body('price').optional().isFloat({ gt: 0 }),
  body('stock').optional().isInt({ min: 0 }),
  body('description').optional().isString()
];

module.exports = { idParam, productCreateRules, productUpdateRules };
