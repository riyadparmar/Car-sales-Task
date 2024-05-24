const Car = require('../models/carModel');

// Create a new car
exports.createCar = async (req, res) => {
  try {
    const { model, brand } = req.body;
    const car = new Car({ model, brand });
    await car.save();
    res.status(201).json(car);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

// Get all cars
exports.getCars = async (req, res) => {
  try {
    const cars = await Car.find().populate('brand');
    res.json(cars);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

// Get car by ID
exports.getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id).populate('brand');
    if (!car) {
      return res.status(404).json({ msg: 'Car not found' });
    }
    res.json(car);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};
