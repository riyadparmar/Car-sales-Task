const express = require('express');
const { getAdminStats, createBrand } = require('../controllers/adminController');

const router = express.Router();

// POST /admin/brands
router.post('/brands', createBrand);

module.exports = router;

const adminMiddleware = (req, res, next) => {
  if (req.headers['x-admin'] === 'true') {
    next();
  } else {
    res.status(403).send('Forbidden');
  }
};

// to get details about the users
router.get('/stats', adminMiddleware, getAdminStats);

module.exports = router;
