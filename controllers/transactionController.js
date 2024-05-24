const Transaction = require('../models/transactionModel');
const User = require('../models/userModel');
const Seller = require('../models/sellerModel');
const Car = require('../models/carModel');

// Create a new transaction
exports.createTransaction = async (req, res) => {
  try {
    const { buyer, seller, car } = req.body;

    // Ensure the buyer, seller, and car exist
    const buyerExists = await User.findById(buyer);
    const sellerExists = await Seller.findById(seller);
    const carExists = await Car.findById(car);

    if (!buyerExists) {
      return res.status(400).json({ msg: 'Buyer does not exist' });
    }
    if (!sellerExists) {
      return res.status(400).json({ msg: 'Seller does not exist' });
    }
    if (!carExists) {
      return res.status(400).json({ msg: 'Car does not exist' });
    }

    // Ensure the buyer and seller are in the same city
    if (buyerExists.city !== sellerExists.city) {
      return res.status(400).json({ msg: 'Buyer and Seller must be in the same city' });
    }

    const transaction = new Transaction({
      buyer,
      seller,
      car,
    });

    await transaction.save();

    res.status(201).json(transaction);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
