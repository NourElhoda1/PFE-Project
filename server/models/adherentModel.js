const mongoose = require('mongoose') ;
const mongoosePagination = require('mongoose-paginate-v2') ;

const experienceSchema = new mongoose.Schema({
    company: String,
    role: String,
    type: String,
    startDate: Date,
    endDate: Date
}, { _id: false }); // Use `_id: false` if you don't want each subdocument to have an `_id` field


const adherentSchema = new mongoose.Schema({
    first_name : {
        type : String ,
    } ,

    last_name : {
        type : String ,
    } ,

    email : {
        type : String ,
        unique : true ,
    } ,

    password : {
        type : String ,
    } ,

    number : {
        type : String ,
    } ,

    country : {
        type : String ,
    } ,

    city : {
        type : String ,
    } ,

    last_login : {
        type : Date ,
    } ,

    valid_account : {
        type : Boolean ,
        default : true ,
    } ,

    active : {
        type : Boolean ,
        default : true ,
    } ,

    created_at : {
        type : Date ,
        default : Date.now ,
    } ,

    updated_at : {
        type : Date ,
        default : Date.now ,    
    },

    profile_pic : {
        type : String ,
        default : ''
    },
    
    chats : {
        type : mongoose.Schema.Types.ObjectId , 
        ref : 'Chat'
    },

    careerStatus: {
        type: String,
    },

    about: {
        type: String,
    },

    education: [{
        institution: String,
        degree: String,
        field: String,
        startDate: Date,
        endDate: Date,
    }],

    experiences: [experienceSchema],

    skills: [String],

    languages: [{
      language: String,
      proficiency: String,
    }],

    projects: [{
        name: String,
        description: String,
        pic : Array,
    }],



} , { timestamps : true }) ;

adherentSchema.plugin(mongoosePagination) ;
const adherentModel = mongoose.model('Adherent' , adherentSchema) ;
module.exports = adherentModel ;