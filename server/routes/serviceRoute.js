const express = require('express') ;
const serviceController = require('../controllers/serviceController');
const serviceRouter = express.Router() ;
const { body } = require('express-validator') ;
const authUserVerification = require('../middlewares/authUserVerification') ;
const adherentVerification = require('../middlewares/adherentVerification') ;

//! Create a new service
serviceRouter.post('/services/add' ,
[
    body("service_name")
        .trim()
        .notEmpty()
        .withMessage("the service name is required")
        .isLength({ min: 3 })
        .withMessage("the service name must be at least 3 characters long"),
    body("categoryId")
        .trim()
        .notEmpty() 
        .withMessage("the category's name is required")
        .isMongoId()
        .withMessage("please enter a valid name category "),
    body("subcategoryId")
        .trim()
        .notEmpty()
        .withMessage("the subcategory's name is required")
        .isMongoId()
        .withMessage("please enter a valid name subcategory "),
    body("sellerId")
        .trim()
        .notEmpty()
        .withMessage("the seller's name is required")
        .isMongoId()
        .withMessage("please enter a valid name seller "),
    body("price")
        .trim()
        .notEmpty()
        .withMessage("the price is required")
        .isNumeric()
        .withMessage("the price must be a number"),
    body("short_description")
        .trim()
        .notEmpty()
        .withMessage("the short description is required")
        .isLength({ min: 3 })
        .withMessage("the short description must be at least 3 characters long"),
    body("long_description")
        .trim()
        .notEmpty()
        .withMessage("the long description is required")
        .isLength({ min: 3 })
        .withMessage("the long description must be at least 3 characters long")

],
serviceController.createService
);

//! List all the services
serviceRouter.get('/services' , serviceController.listingServices) ;

//! Get a service by ID
serviceRouter.get('/services/:id' , serviceController.getServiceById) ;

//! Get a service by Adherent ID
serviceRouter.get('/services/seller/:adherentId' , serviceController.getServiceBySellerId) ;

//! Update the service data
serviceRouter.put(
    '/services/:id' , 
    [
        body("service_name")
            .trim()
            .notEmpty()
            .withMessage("the service name is required")
            .isLength({ min: 3 })
            .withMessage("the service name must be at least 3 characters long"),
        body("categoryId")
            .trim()
            .notEmpty()
            .withMessage("the category's name is required")
            .isMongoId()
            .withMessage("please enter a valid category id"),
        body("subcategoryId")
            .trim()
            .notEmpty()
            .withMessage("the subcategory's name is required")
            .isMongoId()
            .withMessage("please enter a valid subcategory id"),
        body("title")
            .trim()
            .notEmpty()
            .withMessage("the title is required")
            .isLength({ min: 3 })
            .withMessage("the title must be at least 3 characters long"),
        body("price")
            .trim()
            .notEmpty()
            .withMessage("the price is required")
            .isNumeric()
            .withMessage("the price must be a number"),
        body("short_description")
            .trim()
            .notEmpty()
            .withMessage("the short description is required")
            .isLength({ min: 3 })
            .withMessage("the short description must be at least 3 characters long"),
        body("long_description")
            .trim()
            .notEmpty()
            .withMessage("the long description is required")
            .isLength({ min: 3 })
            .withMessage("the long description must be at least 3 characters long")

    ] ,
    serviceController.updateService
) ;

//! Delete a service
serviceRouter.delete('/services/:id' , adherentVerification , serviceController.deleteService) ;

//! Search for services
serviceRouter.get('/service' , serviceController.searchForService) ;

module.exports = serviceRouter ;