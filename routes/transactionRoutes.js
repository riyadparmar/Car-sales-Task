const express = require('express');
const router = express.Router();
const { createTransaction } = require('../controllers/transactionController');

// POST /transactions
router.post('/', createTransaction);

module.exports = router;
