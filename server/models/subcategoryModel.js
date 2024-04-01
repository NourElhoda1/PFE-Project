const mongoose = require('mongoose') ;
const mongoosePagination = require('mongoose-paginate-v2') ;

const subcategorySchema = new mongoose.Schema({
    subcategory_name : {
        type : String ,
        required : [true , 'the subcategory name is required'] ,
    } ,
    category_id : {
        type : mongoose.Schema.Types.ObjectId , 
        ref: 'Category' ,
        
    } ,
    active : {
        type : Boolean ,
        required : [true , 'the active status values is required'] ,
    } ,
})

subcategorySchema.plugin(mongoosePagination) ;
const subcategoryModel = mongoose.model('Subcategory' , subcategorySchema) ;
module.exports = subcategoryModel ;