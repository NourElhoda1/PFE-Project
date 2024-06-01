require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const connecToDb = require('./config/connectToDb');

const userRouter = require('./routes/userRoutes');
const adherentRouter = require('./routes/adherentRoute');
const categoryRouter = require('./routes/categoryRoute');
const subcategoryRouter = require('./routes/subcategoryRoute');
const orderRouter = require('./routes/orderRoute');
const reviewRouter = require('./routes/reviewRoute');
const reclamtionRouter = require('./routes/reclamationRoute');
const serviceRouter = require('./routes/serviceRoute');

const app = express();

//! Database connection
connecToDb();

//! Use middlewares
app.use(express.json());

//! CORS configuration
const corsOptions = {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cookieParser());

//! Use the routes
app.use('/v1', userRouter);
app.use('/v1', adherentRouter);
app.use('/v1', categoryRouter);
app.use('/v1', subcategoryRouter);
app.use('/v1', orderRouter);
app.use('/v1', reviewRouter);
app.use('/v1', reclamtionRouter);
app.use('/v1', serviceRouter);

//! Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

//! Run the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
