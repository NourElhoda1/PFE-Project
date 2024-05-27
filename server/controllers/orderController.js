const { validationResult } = require('express-validator');
const orderModel = require('../models/orderModel');

const orderController = {
    //! Create a new order
    createOrder : async (req , res) => {

        const{
            serviceId,
            buyerId,
            status,
        } = req.body;

        //* Check if there is an error in the Validation
        const errors = validationResult(req) ;
        if (!errors.isEmpty()) {
            return res.status(400).json(errors);
        }

        try {
            const order = await orderModel.create({
                serviceId : serviceId,
                buyerId : buyerId,
                status : status,
            });

            const populatedService = await orderModel
            .findById(order._id)
            .populate('serviceId')
            .populate('buyerId')
            .exec();

            res.status(200).json({
                message : 'The order has been created with success' ,
                order : order , 
            });
        }
        catch ( error ) {
            console.log('Something went wrong' , error);
            res.status(500).json({ message: 'Something went wrong' });
        }
    },

    //! List all the orders list
    listingOrders : async (req , res) => {
        try {
             //* Here are my option that i will use to paginate
            var options = {
                sort : { created_at: -1 } ,
                lean : true ,
                populate : ['buyerId' , 'serviceId'] ,
                page : req.query.page  ,
                limit : 100 ,
            };

            //* Paginate with populate
            const orders = await orderModel.paginate({} , options) ;      
            
            //* Send all subcategories with the name of the category
            if ( orders ) {
                res.status(200).json(orders);
            }
      
        } 
        catch ( error ) {
        res.status(403).json({
            message : 'Something went wrong' ,
            error : error ,
        });
        }
  },

    //! Get a order by ID
    getOrderById : async (req , res) => {
        const { id } = req.params;
        try {
            const order = await orderModel.findById(id);
    
            if (!order) {
                return res.status(404).json({ error: 'Order not found' });
            }
    
            res.status(200).json({
                success: true,
                order,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: error.message });
        }
    },

    //! Updating the order status
    updateOrderStatus: async (req, res) => {
        try {
            const { id } = req.params;
            const { status } = req.body;
            const order = await Order.findByIdAndUpdate(id, { status }, { new: true });
            
            if (!order) {
                return res.status(404).json({ message: 'Order not found' });
            }
            res.status(200).json({ message: 'Order status updated successfully', order });
        } catch (error) {
            console.error('Error updating order status:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
}

module.exports = orderController ;