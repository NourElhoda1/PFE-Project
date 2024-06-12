const express = require("express");
const adherentController = require("../controllers/adherentController.js");
const adherentRouter = express.Router();
const { body } = require("express-validator");
const adherentVerification = require('../middlewares/adherentVerification.js') ;
const authUserVerification = require('../middlewares/authUserVerification') ;

//! Customer authentication ( Login )
adherentRouter.post('/adherents/login' , [
  body("email")
    .trim()
    .notEmpty().withMessage('the email is required')
    .isEmail().withMessage('please enter a valid email') , 
  body("password")
    .trim()
    .notEmpty().withMessage('the password is required')
] , adherentController.authenticateAdherent);


//! Create new adherent ( Register )
adherentRouter.post(
  "/adherents/register" ,
  [
    body("first_name")
      .trim()
      .notEmpty().withMessage("the first name is required")
      .isAlpha().withMessage("please enter a valid first name") ,
    body("last_name")
      .trim()
      .notEmpty().withMessage("the last name is required")
      .isAlpha().withMessage("please enter a valid last name") ,
    body("email")
      .trim()
      .notEmpty().withMessage("the email is required")
      .isEmail().withMessage("please enter a valid email") ,
    body("password")
      .trim()
      .notEmpty().withMessage("the password is required") ,
    body("number")
      .trim()
      .notEmpty().withMessage("the number is required") ,
    body("country")
      .trim()
      .notEmpty().withMessage("the country is required") ,
    body("city")
      .trim()
      .notEmpty().withMessage("the city is required") 
  ],
  adherentController.adherentRegister
);

//!logout
adherentRouter.post("/adherents/logout" , authUserVerification , adherentController.Adherentlogout);

//! Get all adherents
adherentRouter.get("/adherents" , adherentController.listingAdherents);

//! Search for a adherent
adherentRouter.get("/adherent" , adherentController.searchForAdherent);

//! Adherent profile
adherentRouter.get("/adherent/profile" , adherentVerification , adherentController.adherentProfile);

//! Get an adherent's profile by ID
adherentRouter.get("/adherent/profile/:id" , adherentController.getAdherentProfileById);

//! Get a adherent by ID
adherentRouter.get("/adherents/:id" , adherentController.getAdherentById);

//! Validate the adherent's account
adherentRouter.put("/validate/:id" , adherentController.validateAndInvalidateAdherentAccount);

//! Updating the adherent's data 
adherentRouter.put("/adherents/:id"  , adherentController.updateAdherent);

//! Update profile information
adherentRouter.put('/adherent/profile/update/information', adherentVerification , adherentController.adherentCanUpdateProfile) ;

//! Update profile about me
adherentRouter.put('/adherent/profile/update/about', adherentVerification , adherentController.adherentCanUpdateAbout) ;

//! Update profile education
adherentRouter.put('/adherent/profile/update/education', adherentVerification , adherentController.adherentCanUpdateEducation) ;

//! Update profile experience
adherentRouter.put('/adherent/profile/update/experience', adherentVerification , adherentController.adherentCanUpdateExperiences) ;

//! Update profile project
adherentRouter.put('/adherent/profile/update/portfolio', adherentVerification , adherentController.adherentCanUpdatePortfolio) ;

//! Update profile password
adherentRouter.put('/adherent/profile/update/password' , adherentController.adherentCanUpdatePassword) ;


//! Block or unblock a adherent 
adherentRouter.put("/adherents/block-unblock/:id"  , adherentController.blockOrUnblock) ;



module.exports = adherentRouter;
