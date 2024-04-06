const mongoose = require("mongoose");
const mongoosePagination = require('mongoose-paginate-v2')

const serviceSchema = new mongoose.Schema({
  service_name: {
    type: String,
    required: [true, "the name of the service is required"],
  },
      
  categoryId: {
    type: mongoose.Schema.Types.ObjectId ,
    ref : 'Category' ,
    required: true,

  },

  subcategoryId: {
    type: mongoose.Schema.Types.ObjectId ,
    ref : 'Subcategory' ,
    required: true,

  },

  sellerId: {
    type: mongoose.Schema.Types.ObjectId ,
    ref : 'Adherent' ,
    required: true,
  },

  images: {
    type: Array,
    required: false,
  },

  price: {
    type: Number,
    required: [true, "the price is required"],
  },

  short_description: {
    type: String ,
    required: [true, "a short description of the service is required"] ,
  },

  long_description: {
    type: String ,
    required: [true, "a long description of the service is required"] ,
  },

  created_at: {
    type: Date,
    default: Date.now ,
  },

  updated_at: {
    type: Date,
    default: Date.now ,
  }

} , { timestamps : true });

serviceSchema.plugin(mongoosePagination);
const serviceModel = mongoose.model("Service", serviceSchema);
module.exports = serviceModel;