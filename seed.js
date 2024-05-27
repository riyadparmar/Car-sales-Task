const mongoose = require('mongoose');
const connectDB = require('./config/db');

const Brand = require('./models/brandModel');
const Car = require('./models/carModel');
const Seller = require('./models/sellerModel');
const User = require('./models/userModel');
const Transaction = require('./models/transactionModel');

const seedData = async () => {
  await connectDB();

  // Clear existing data
  await Brand.deleteMany({});
  await Car.deleteMany({});
  await Seller.deleteMany({});
  await User.deleteMany({});
  await Transaction.deleteMany({});

  // Create Brands
  const brands = await Brand.insertMany([
    { name: 'BrandA' },
    { name: 'BrandB' },
    { name: 'BrandC' },
    { name: 'BrandD' }
  ]);

  // Create Cars
  const cars = [];
  for (const brand of brands) {
    for (let i = 0; i < 3; i++) {
      const car = new Car({
        model: `${brand.name} Model${i+1}`,
        brand: brand._id
      });
      await car.save();
      cars.push(car);
    }
  }

  // Create Sellers
  const cities = ['CityA', 'CityB', 'CityC', 'CityD', 'CityE', 'CityF', 'CityG'];
  const sellers = [];
  for (const city of cities) {
    const seller = new Seller({
      name: `Seller in ${city}`,
      city,
      cars: cars.filter((_, index) => index % 2 === 0).map(car => car._id)
    });
    await seller.save();
    sellers.push(seller);
  }

  // Create Users
  const users = [];
  for (const city of cities) {
    for (let i = 0; i < 10; i++) {
      const user = new User({
        name: `User${i+1} in ${city}`,
        city
      });
      await user.save();
      users.push(user);
    }
  }

  // Create Transactions
  const createTransaction = async (user, seller, car) => {
    const transaction = new Transaction({
      buyer: user._id,
      seller: seller._id,
      car: car._id
    });
    await transaction.save();
  };

  for (let i = 0; i < 20; i++) {
    const randomUser = users[Math.floor(Math.random() * users.length)];
    const randomSeller = sellers.find(seller => seller.city === randomUser.city);
    const randomCar = cars[Math.floor(Math.random() * cars.length)];

    await createTransaction(randomUser, randomSeller, randomCar);
  }

  console.log('Database seeded!');
  mongoose.connection.close();
};

seedData().catch(err => {
  console.error(err);
  mongoose.connection.close();
});
