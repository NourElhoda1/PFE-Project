const mongoose = require("mongoose");
const mongoosePagination = require('mongoose-paginate-v2')

const conversationSchema = new mongoose.Schema({
    id: {
      type : String,
      required : true,
      unique : true,
    },

    sellerId: {
      type : mongoose.Schema.Types.ObjectId,
      ref : 'Adherent',
      required : true,
    },

    buyerId: {
      type : mongoose.Schema.Types.ObjectId,
      ref : 'Adherent' ,
      required : true,
    },

    readBySeller: {
      type : Boolean,
      required : true,
    },

    readByBuyer: {
      type : Boolean,
      required : true,
    },
    
    lastMessage: {
      type : String,
      required : false,
    }

  }, { timestamps: true });

conversationSchema.plugin(mongoosePagination);
const conversationModel = mongoose.model("Conversation", conversationSchema);
module.exports = conversationModel;