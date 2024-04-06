const { validationResult } = require('express-validator') ;
const categoryModel = require('../models/categoryModel') ;

const categoryController = {

    //! Create a new category
    addNewCategory : async (req , res) => {

        const{
            category_name,
            active,
        } = req.body;

        //* Check if there is an error in the Validation
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json( errors );
        }  
        
        //* Check if the category already exist
        const existingCategory = await categoryModel.findOne({ category_name });
        if (typeof category_name !== 'string') {
           return res.status(400).json({ message: 'Category name must be a string' });
        }
        if (existingCategory) {
            return res.status(400).json({ message: 'The category already exist' });
        }

        //* Create a new category
        try {
            const newCategory = await categoryModel.create({
                category_name : category_name, 
                active : active,
            });
            res.status(200).json({
                message : 'Category created with success',
                category : newCategory, 
            });
        }
        catch ( error ) {
            console.log('Something went wrong' , error);
            res.status(500).json({ message: 'Something went wrong' });
        }
    },

    //! Get all categories list
    listingCategories : async (req , res) => {
        try {
            //* Paginate the categories
            const categories = await categoryModel.paginate(
                {}, 
                { page : req.query.page , limit : 100 }
            );
            res.status(200).send(categories);
        }
        catch ( error ) {
            console.log('Something went wrong' , error);
            res.status(500).json({ message: 'Something went wrong' });
        }
    },

    //! Get a category by ID
    getCategoryById : async (req , res) => {
        const { id } = req.params;
        try {
            const category = await categoryModel.findOne({ _id : id });
            res.status(200).send(category);
        }
        catch ( error ) {
            console.log('Something went wrong' , error);
            res.status(500).json({ message: 'Something went wrong' });
        }
    },

    //! Update a category
    updateCategory : async (req , res) => {
        const { id } = req.params;
        const{
            category_name,
            active,
        } = req.body;

        //* Check if there is an error in the Validation
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json( errors );
        }  

        //* Update a category
        try {
            const category = await categoryModel.findByIdAndUpdate(id, { category_name, active });
            if (!category) {
                return res.status(404).json({ message: 'Category not found' });
            }
            res.status(200).json({ message: 'The category has been updated with success' });
        } 
            catch (error) {
            console.log('Something went wrong', error);
            res.status(500).json({ message: 'Something went wrong' });
        }
    },

        //! Delete a category
        deleteCategory : async (req , res) => {
            const { id } = req.params;
            try {
                const deletedCategory = await categoryModel.findByIdAndDelete(id);
                if (!deletedCategory) {
                    return res.status(404).json({ message: 'Category not found' });
                }
                res.status(200).json({ message: 'The category has been deleted with success' });
            }
            catch ( error ) {
                console.log('Something went wrong', error);
                res.status(500).json({ message: 'Something went wrong' });
            }
        },

        //! Search a category
        searchForCategory : async (req , res) => {
            try {
                const category = await categoryModel.paginate(
                    {category_name : req.query.name} ,
                    { name : req.query.name , page : req.query.page , limit : 100 }
                ) ;
                res.status(200).send(category) ;
            }
            catch ( error ) {
                console.log('Something went wrong' , error) ;
            }
        } ,

    } 


module.exports = categoryController;