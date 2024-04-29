const express = require('express') ;
const orderController = require('../controllers/orderController');
const orderRouter = express.Router() ;
const { body } = require('express-validator') ;
const authUserVerification = require('../middlewares/authUserVerification') ;
const adherentVerification = require('../middlewares/adherentVerification') ; 

//! Create a new order
orderRouter.post("/orders/add"  , orderController.createOrder) ;


//! List all the orders
orderRouter.get('/orders'  , orderController.listingOrders) ;

//! Get a order by ID
orderRouter.get('/orders/:id' , orderController.getOrderById) ;

//! Updating the order status
orderRouter.put('/orders/:id', orderController.updateOrderStatus);


module.exports = orderRouter