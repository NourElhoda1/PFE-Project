const { validationResult } = require('express-validator');
const subcategoryModel = require('../models/subcategoryModel') ;

const subcategoryController = {

    //! Create a new subcategory 
    createSubcategory : async (req , res) => {

        const { 
            subcategory_name,
            categoryId, 
            active
        } = req.body ;

        //* Check is there is any validation problem
        const errors = validationResult(req) ;
        if ( !errors.isEmpty() ) {
            return res.status(400).json(errors) ;
        }

        try {
            //* Create the new subcategory
            const subcategory = await subcategoryModel.create({
                subcategory_name : subcategory_name ,
                categoryId : categoryId ,
                active : active , 
            }) ;

            //* Show message of success
            if ( subcategory ) {
                return res.status(200).json({
                    message : 'the subcategory has been created with success' ,
                    subcategory : subcategory ,
                }) ;
            }
        }
        catch ( error ) {
            console.log( error )
        }
    } ,

    //! List all the subcategories 
    listingSubcategories : async (req , res) => {
        try {
            //* Here are my option that i will use to paginate
            var options = {
                sort : { created_at: -1 } ,
                lean : true ,
                populate : 'categoryId' ,
                page : req.query.page  ,
                limit : 100 ,
            };

            //* Paginate with populate
            const subcategories = await subcategoryModel.paginate( {} , options ) ;

            //* Send all subcategories with the name of the category
            if ( subcategories ) {
                return res.status(200).json(subcategories) ;
            }
        }
        catch ( error ) {
            console.log( error )
        }        
    } ,

    //! Search for subcategories
    searchForSubcategories : async (req , res) => {
        try {
            //* Here are my option that i will use to paginate
            var options = {
                sort : { created_at: -1 } ,
                lean : true ,
                populate : 'categoryId' ,
                page : req.query.page  ,
                limit : 10 ,
            };

            //* Get the subcategory by name
            const subcategories = await subcategoryModel.paginate(
                { subcategory_name : { $regex :req.query.name } } ,
                options ,
            ) ;

            //* Show the subcategories 
            if ( subcategories ) {
                return res.status(200).json(subcategories) ;
            }
        }
        catch ( error ) {
            console.log( error )
        }
    } ,

    //! Get a subcategory by ID
    getSubcategoryById : async (req , res) => {
        const { id } = req.params ;
        try {
            //* Get the subcategory by its id
            const subcategory = await subcategoryModel.findOne({ _id : id }).populate({path : 'categoryId' , select : 'category_name'}) ;

            //* show the subcategory
            if ( subcategory ) {
                return res.status(200).send(subcategory) ;
            } else {
                return res.status(404).send("Subcategory not found");
            }
        }
        catch ( error ) {
            console.log( error )
        }
    } ,

    //! Update the subcategory data
    updateSubcategory : async (req , res) => {
        const { subcategory_name , category_id , active } = req.body ;
        const { id } = req.params ;

        //* Check is there is any validation problem
        const errors = validationResult(req) ;
        if ( !errors.isEmpty() ) {
            return res.status(400).json(errors) ;
        } 

        try {
            
            //* Update the subcategory
            const subcategory = await subcategoryModel.findByIdAndUpdate(id , {
                subcategory_name : subcategory_name ,
                categoryId : categoryId ,
                active : active ,
            }) ;

            if ( subcategory ) {
                return res.status(200).json({
                    message : 'the subcategory has been updated with success' ,
                })
            }
        }
        catch ( error ) {
            console.log( error )
        }
    } ,

    //! Delete a subcategory
    deleteSubcategory : async (req , res) => {
        const { id } = req.params ;
        try {
            //* Delete the subcategory
            const subcategory = await subcategoryModel.findByIdAndDelete(id) ;

            if ( subcategory ) {
                return res.status(200).json({
                    message : 'the subcategory has been deleted with success' ,
                }) ;
            }
        }
        catch ( error ) {
            res.status(404).json( error )
        }
    } ,
}

module.exports = subcategoryController ;
