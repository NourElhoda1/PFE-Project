//* Load env variables
if (process.env.NODE_ENV != "production") {
    require("dotenv").config();
}
  
const mongoose = require("mongoose");
  
//* Connect our app with atlas database

async function connectToDb() {
    try {
      await mongoose.connect(process.env.MONGODB_URL);
      console.log("Database is connected...");
    } catch (err) {
      console.log(err);
    }
}
  
module.exports = connectToDb;