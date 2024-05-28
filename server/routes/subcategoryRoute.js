const express = require('express');
const subcategoryController = require('../controllers/subcategoryController');
const subcategoryRouter = express.Router();
const { body } = require('express-validator');
const authUserVerification = require('../middlewares/authUserVerification');

//! Create a new subcategory
subcategoryRouter.post(
    '/subcategories/add',
    [
        body('subcategory_name')
            .trim()
            .notEmpty()
            .withMessage("the subcategory's name is required"),
        body('category_name')
            .trim()
            .notEmpty()
            .withMessage("the category's name is required"),
        body('active')
            .trim()
            .notEmpty()
            .withMessage('the subcategory status is required'),
    ],
    authUserVerification,
    subcategoryController.createSubcategory
);

//! List all the subcategories
subcategoryRouter.get(
    '/subcategories',
    subcategoryController.listingSubcategories
);

//! Get a subcategory by ID
subcategoryRouter.get(
    '/subcategory/:id',
    authUserVerification,
    subcategoryController.getSubcategoryById
);

//! Search for subcategories
subcategoryRouter.get(
    '/subcategory',
    authUserVerification,
    subcategoryController.searchForSubcategories
);

//! Update the subcategory data
subcategoryRouter.put(
    '/subcategories/:id',
    [
        body('subcategory_name')
            .trim()
            .notEmpty()
            .withMessage("the subcategory's name is required"),
        body('category_name')
            .trim()
            .notEmpty()
            .withMessage("the category's name' is required"),
        body('active')
            .trim()
            .notEmpty()
            .withMessage('the subcategory status is required'),
    ],
    subcategoryController.updateSubcategory
);

//! Delete a subcategory
subcategoryRouter.delete(
    '/subcategories/:id',
    authUserVerification,
    subcategoryController.deleteSubcategory
);

module.exports = subcategoryRouter;
