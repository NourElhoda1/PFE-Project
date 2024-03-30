const mongoose = require('mongoose') ;
const mongoosePagination = require('mongoose-paginate-v2') ;

const reclamationSchema = new mongoose.Schema({
    reclamation_description : {
        type : String ,
        required : [true , 'the reclamation description is required'] ,
    } ,

    reclamation_date : {
        type : Date ,
        required : [true , 'the reclamation date is required'] ,
    } ,

    adherent_id : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : 'Customer' ,
        required : [true , 'the customer id is required'] , 
    } ,

    service_id : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : 'Service' ,
        required : [true , 'the service id is required'] ,
    } ,

} , { timestamps : true }) ;

reclamationSchema.plugin(mongoosePagination) ;
const reclamationModel = mongoose.model('Reclamation' , reclamationSchema) ;
module.exports = reclamationModel ;