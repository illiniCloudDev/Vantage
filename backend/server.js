const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const Transaction = require('./models/Transaction');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth');
const transactions = require('./routes/transactions');


dotenv.config();

//Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;
const allowedOrigins = [
  'http://localhost:5173',
  'https://vantage-frontend-rbkk.onrender.com' //live URL of Frontend
];

// Middleware
app.use(cors({
  origin: function(origin, callback){
    if(!origin) return callback(null,true);

    if(allowedOrigins.indexOf(origin) !== -1){
      callback(null,true);
    }else{
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
}));

app.use(express.json());
app.use(cookieParser());

//Routes
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