const mongoose = require('mongoose') ;
const mongoosePagination = require('mongoose-paginate-v2') ;

const reclamationSchema = new mongoose.Schema({
    reclamation_description : {
        type : String ,
        required : [true , 'the reclamation description is required'] ,
    } ,

    reclamation_date : {
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

reclamationSchema.plugin(mongoosePagination) ;
const reclamationModel = mongoose.model('Reclamation' , reclamationSchema) ;
module.exports = reclamationModel ;