const express = require('express') ;
const reclamationController = require('../controllers/reclamationController');
const reclamationRouter = express.Router() ;
const { body } = require('express-validator') ;
const authUserVerification = require('../middlewares/authUserVerification') ;
const adherentVerification = require('../middlewares/adherentVerification') ;

//! Create a new reclamation
reclamationRouter.post(
    "/reclamations/add" , adherentVerification , 
    [
        body("reclamation_description")
            .trim()
            .notEmpty().withMessage("the reclamation description is required") ,
        body("buyerId")
            .trim()
            .notEmpty().withMessage("the buyer's name is required") ,
        body("serviceId")
            .trim()
            .notEmpty().withMessage("the service's name is required")
    ],
    reclamationController.createReclamation
); 

//! List all the reclamations
reclamationRouter.get('/reclamations' , authUserVerification , reclamationController.listingReclamations) ;

//! Get a reclamation by ID
reclamationRouter.get('/reclamation/:id' , authUserVerification , reclamationController.getReclamationById) ;

//! Delete a reclamation
reclamationRouter.delete('/reclamations/:id' , authUserVerification , reclamationController.deleteReclamation) ;

//! Search for reclamations
reclamationRouter.get('/reclamation' , authUserVerification , reclamationController.searchForReclamation) ;

module.exports = reclamationRouter ;