const mongoose = require('mongoose') ;
const mongoosePagination = require('mongoose-paginate-v2') ;

const messageSchema = new mongoose.Schema({
    
    chatId : {
        type : String ,
    },

    senderId : {
        type : String ,
    },

    text : {
        type : String ,
    }
    
} , { timestamps : true }) ;

messageSchema.plugin(mongoosePagination) ;
const messageModel = mongoose.model('Message' , messageSchema) ;
module.exports = messageModel ;

