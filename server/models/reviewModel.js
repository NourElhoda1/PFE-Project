const mongoose = require('mongoose') ;
const mongoosePagination = require('mongoose-paginate-v2') ;

const reviewSchema = new mongoose.Schema({
    review_description : {
        type : String ,
        required : [true , 'the review description is required'] ,
    } ,

    buyerId : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : 'Adherent' , 
        required : true ,
    } ,

    service_id : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : 'Service' ,
        required : true ,
    } ,

    created_at : {
        type : Date ,
        default: Date.now ,
    } 

} , { timestamps : true }) ;

reviewSchema.plugin(mongoosePagination) ;
const reviewModel = mongoose.model('Review' , reviewSchema) ;
module.exports = reviewModel ;