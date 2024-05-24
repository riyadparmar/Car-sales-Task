const Seller = require('../models/sellerModel');
const Car = require('../models/carModel');

// Create a new seller
exports.createSeller = async (req, res) => {
  try {
    const { name, city, cars } = req.body;
    const seller = new Seller({ name, city, cars });
    await seller.save();
    res.status(201).json(seller);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

// Get all sellers
exports.getSellers = async (req, res) => {
  try {
    const sellers = await Seller.find().populate('cars');
    res.json(sellers);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

// Get seller by ID
exports.getSellerById = async (req, res) => {
  try {
    const seller = await Seller.findById(req.params.id).populate('cars');
    if (!seller) {
      return res.status(404).json({ msg: 'Seller not found' });
    }
    res.json(seller);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

// Add car to seller's inventory
exports.addCarToSeller = async (req, res) => {
  try {
    const { sellerId, carId } = req.body;
    const seller = await Seller.findById(sellerId);
    if (!seller) {
      return res.status(404).json({ msg: 'Seller not found' });
    }
    const car = await Car.findById(carId);
    if (!car) {
      return res.status(404).json({ msg: 'Car not found' });
    }
    seller.cars.push(car);
    await seller.save();
    res.json(seller);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};
