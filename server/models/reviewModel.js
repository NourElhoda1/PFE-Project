const mongoose = require('mongoose') ;
const mongoosePagination = require('mongoose-paginate-v2') ;

const reviewSchema = new mongoose.Schema({
    review_description : {
        type : String ,
        required : [true , 'the review description is required'] ,
    } ,

    review_date : {
        type : Date ,
    } ,

    adherent_id : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : 'Customer' , 
    } ,

    service_id : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : 'Service' ,
    } ,

} , { timestamps : true }) ;

reviewSchema.plugin(mongoosePagination) ;
const reviewModel = mongoose.model('Review' , reviewSchema) ;
module.exports = reviewModel ;