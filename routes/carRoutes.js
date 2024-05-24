const express = require('express');
const { createCar, getCars, getCarById } = require('../controllers/carController');

const router = express.Router();

router.post('/', createCar);
router.get('/', getCars);
router.get('/:id', getCarById);

module.exports = router;
