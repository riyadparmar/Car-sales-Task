const Transaction = require('../models/transactionModel');
const Seller = require('../models/sellerModel');
const Car = require('../models/carModel');
const Brand = require('../models/brandModel');

exports.createBrand = async (req, res) => {
  try {
    const { name } = req.body;
    const brand = new Brand({ name });
    await brand.save();
    res.status(201).json(brand);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getAdminStats = async (req, res) => {
  try {
    const totalCarsSold = await Transaction.countDocuments();

    const cityWithMostSales = await Transaction.aggregate([
      {
        $lookup: {
          from: 'sellers',
          localField: 'seller',
          foreignField: '_id',
          as: 'seller'
        }
      },
      { $unwind: '$seller' },
      {
        $group: {
          _id: '$seller.city',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 1 }
    ]);

    const mostSoldCar = await Transaction.aggregate([
      {
        $group: {
          _id: '$car',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 1 }
    ]).lookup({
      from: 'cars',
      localField: '_id',
      foreignField: '_id',
      as: 'car'
    }).unwind('car').project({
      model: '$car.model',
      count: 1
    });

    const mostSoldBrand = await Transaction.aggregate([
      {
        $lookup: {
          from: 'cars',
          localField: 'car',
          foreignField: '_id',
          as: 'car'
        }
      },
      { $unwind: '$car' },
      {
        $group: {
          _id: '$car.brand',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 1 }
    ]).lookup({
      from: 'brands',
      localField: '_id',
      foreignField: '_id',
      as: 'brand'
    }).unwind('brand').project({
      name: '$brand.name',
      count: 1
    });

    res.json({
      totalCarsSold,
      cityWithMostSales: cityWithMostSales[0]?._id || 'N/A',
      mostSoldCar: mostSoldCar[0]?.model || 'N/A',
      mostSoldBrand: mostSoldBrand[0]?.name || 'N/A'
    });
  } catch (err) {
    res.status(500).send('Server Error');
  }
};
