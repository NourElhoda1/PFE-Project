const mongoose = require("mongoose");
const mongoosePagination = require('mongoose-paginate-v2')

const serviceSchema = new mongoose.Schema({
  service_name: {
    type: String,
    required: [true, "the name of the service is required"],
  },
      
  category_id: {
    type: mongoose.Schema.Types.ObjectId ,
    ref : 'Category' ,

  },

  subcategory_id: {
    type: mongoose.Schema.Types.ObjectId ,
    ref : 'Subcategory' ,

  },

  title: {
    type: String,
    required: true,
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

});

serviceSchema.plugin(mongoosePagination);
const serviceModel = mongoose.model("Service", serviceSchema);
module.exports = serviceModel;