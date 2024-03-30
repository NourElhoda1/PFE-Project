const mongoose = require('mongoose') ;
const mongoosePagination = require('mongoose-paginate-v2') ;

const adherentSchema = new mongoose.Schema({
    first_name : {
        type : String ,
        required : [true , 'the first name is required'] ,
    } ,

    last_name : {
        type : String ,
        required : [true , 'the last name is required'] ,
    } ,

    user_name : {
        type : String ,
        required : [true , 'the username is required'] ,
        unique : true,
    },
    
    email : {
        type : String ,
        unique : true ,
        required : [true , 'the email is required'] ,
    } ,

    password : {
        type : String , 
        required : [true , 'the password is required'] ,
    } ,

    last_login : {
        type : Date ,
    } ,

    valid_account : {
        type : Boolean ,
        default : false ,
    } ,

    active : {
        type : Boolean ,
        default : true ,
    } ,

    role : {
        type : String ,
        default : 'adherent' ,
    }

} , { timestamps : true }) ;

adherentSchema.plugin(mongoosePagination) ;
const adherentModel = mongoose.model('adherent' , adherentSchema) ;
module.exports = adherentSchema ;