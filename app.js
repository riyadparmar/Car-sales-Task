const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');

const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');
const carRoutes = require('./routes/carRoutes');
const sellerRoutes = require('./routes/sellerRoutes');
const transactionRoutes = require('./routes/transactionRoutes');

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(bodyParser.json());

app.use('/admin', adminRoutes);
app.use('/users', userRoutes);
app.use('/cars', carRoutes);
app.use('/sellers', sellerRoutes);
app.use('/transactions', transactionRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
