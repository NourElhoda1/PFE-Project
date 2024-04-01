const express = require('express') ;
const subcategoryController = require('../controllers/subcategoryController');
const subcategoryRouter = express.Router() ;
const { body } = require('express-validator') ;
const authUserVerification = require('../middlewares/authUserVerification') ;

//! Create a new subcategory 
subcategoryRouter.post(
  "/subcategories/add" , authUserVerification , 
  [
    body("subcategory_name")
      .trim()
      .notEmpty().withMessage("the subcategory name is required"),

  ],
  subcategoryController.createSubcategory
);

//! List all the subcategories 
subcategoryRouter.get('/subcategories' , authUserVerification , subcategoryController.listingSubcategories) ;

//! Get a subcategory by ID
subcategoryRouter.get('/subcategories/:id' , authUserVerification , subcategoryController.getSubcategoryById) ;

//! Search for subcategories
subcategoryRouter.get('/subcategory' , authUserVerification , subcategoryController.searchForSubcategories) ;

//! Update the subcategory data
subcategoryRouter.put(
  '/subcategories/:id' , authUserVerification , 
  [
    body("subcategory_name")
      .trim()
      .notEmpty().withMessage("the subcategory name is required"),
   
  ] , 
  subcategoryController.updateSubcategory
) ;

//! Delete a subcategory
subcategoryRouter.delete('/subcategories/:id' , authUserVerification , subcategoryController.deleteSubcategory) ;

module.exports = subcategoryRouter ;
