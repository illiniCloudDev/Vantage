const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const Transaction = require('./models/Transaction');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth');
const transactions = require('./routes/transactions');


dotenv.config({path: './.env'});

//Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRoutes)
app.use('/api/transactions', transactions)

//Test Route

app.get('/', (req, res) => {
    res.send('Vantage is online!');
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});