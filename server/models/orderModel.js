const mongoose = require('mongoose') ;
const mongoosePagination = require('mongoose-paginate-v2') ;

const orderSchema = new mongoose.Schema({
      serviceId: {
        type: mongoose.Schema.Types.ObjectId ,
        ref : 'Service' ,
        required : true,
      },

      img: {
        type: String ,
        required : true ,
      },

      price: {
        type: Number ,
        required : true ,
      },

      sellerId: {
        type: mongoose.Schema.Types.ObjectId ,
        ref : 'Adherent' ,
        required : true,
      },

      buyerId: {
        type: mongoose.Schema.Types.ObjectId ,
        ref : 'Adherent' ,
        required : true,
      },

      status: {
        type: String ,
        enum: ['pending', 'accepted', 'completed', 'cancelled'] ,
        required: true ,
      },

      createdAt: {
        type: Date ,
        default: Date.now ,
      },

      updatedAt: {
        type: Date ,
        default: Date.now ,
      } 

    } , { timestamps : true }) ;

    orderSchema.plugin(mongoosePagination) ;
    const orderModel = mongoose.model('Order' , orderSchema) ;
    module.exports = orderModel ;