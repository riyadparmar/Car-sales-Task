const express = require('express');
const { createSeller, getSellers, getSellerById, addCarToSeller } = require('../controllers/sellerController');

const router = express.Router();

router.post('/', createSeller);
router.get('/', getSellers);
router.get('/:id', getSellerById);
router.post('/add-car', addCarToSeller);

module.exports = router;
