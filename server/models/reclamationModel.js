const mongoose = require('mongoose') ;
const mongoosePagination = require('mongoose-paginate-v2') ;

const reclamationSchema = new mongoose.Schema({

    reclamation_name : {
        type : String ,
        required : [true , 'the reclamation name is required'] ,
    },
    
    reclamation_description : {
        type : String ,
        required : [true , 'the reclamation description is required'] ,
    } ,

    buyerId : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : 'Adherent' ,
        required : true ,

    } ,

    serviceId : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : 'Service' ,
        required : true ,
    } ,
    
    created_at : {
        type : Date ,
        default: Date.now ,
    } 

} , { timestamps : true }) ;

reclamationSchema.plugin(mongoosePagination) ;
const reclamationModel = mongoose.model('Reclamation' , reclamationSchema) ;
module.exports = reclamationModel ;