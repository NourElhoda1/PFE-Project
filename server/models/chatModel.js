const mongoose = require('mongoose') ;
const mongoosePagination = require('mongoose-paginate-v2') ;

const chatSchema = new mongoose.Schema({
   
    members : {
        type : Array ,
    } ,

} , { timestamps : true }) ;

chatSchema.plugin(mongoosePagination) ;
const chatModel = mongoose.model('Chat' , chatSchema) ;
module.exports = chatModel ;