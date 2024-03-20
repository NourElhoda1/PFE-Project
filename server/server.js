//* Load env variables
if (process.env.NODE_ENV != "production") {
    require("dotenv").config();
}

const express = require('express');
const app = express();
const cors = require('cors');


const connecToDb = require('./config/connectToDb');




//! Database connection
connecToDb();

//! Use middlewares
app.use(express.json());
app.use(cors());


//! Use the routes


//! Run the server
const PORT = process.env.PORT || 5000; 
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});