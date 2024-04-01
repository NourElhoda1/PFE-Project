const express = require('express') ;
const reclamationController = require('../controllers/reclamationController');
const reclamationRouter = express.Router() ;
const { body } = require('express-validator') ;
const authUserVerification = require('../middlewares/authUserVerification') ;

//! Create a new reclamation
reclamationRouter.post(
    "/reclamations/add" , authUserVerification , 
    [
        body("reclamation_description")
            .trim()
            .notEmpty().withMessage("the reclamation description is required") ,
    ],
    reclamationController.createReclamation
); 

//! List all the reclamations
reclamationRouter.get('/reclamations' , authUserVerification , reclamationController.listingReclamations) ;

//! Get a reclamation by ID
reclamationRouter.get('/reclamations/:id' , authUserVerification , reclamationController.getReclamationById) ;

//! Delete a reclamation
reclamationRouter.delete('/reclamations/:id' , authUserVerification , reclamationController.deleteReclamation) ;

module.exports = reclamationRouter ;