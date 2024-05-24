const express = require('express');
const { getAdminStats, createBrand } = require('../controllers/adminController');

const router = express.Router();

// POST /admin/brands
router.post('/brands', createBrand);

module.exports = router;


// Assuming some kind of admin middleware for authentication
const adminMiddleware = (req, res, next) => {
  // Dummy admin check
  if (req.headers['x-admin'] === 'true') {
    next();
  } else {
    res.status(403).send('Forbidden');
  }
};

router.get('/stats', adminMiddleware, getAdminStats);

module.exports = router;
