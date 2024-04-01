const mongoose = require('mongoose') ;
const mongoosePagination = require('mongoose-paginate-v2') ;

const orderSchema = new mongoose.Schema({
   serviceId: {
        type: String,
        required: true,
      },

      title: {
        type: String,
        required: true,
      },

      price: {
        type: Number,
        required: true,
      },

      sellerId: {
        type: String,
        required: true,
      },

      buyerId: {
        type: String,
        required: true,
      },
      
      isCompleted: {
        type: Boolean,
        default: false,
      },

    } , { timestamps : true }) ;

    orderSchema.plugin(mongoosePagination) ;
    const orderModel = mongoose.model('Order' , orderSchema) ;
    module.exports = orderSchema ;