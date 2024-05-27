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
      .notEmpty().withMessage("the city is required") ,
    body("postal_code")
      .trim()
      .notEmpty().withMessage("the postal code is required")
  ],
  adherentController.adherentRegister
);

//! Get all adherents
adherentRouter.get("/adherents" , adherentController.listingAdherents);

//! Search for a adherent
adherentRouter.get("/adherent" , adherentController.searchForAdherent);

//! Adherent profile
adherentRouter.get("/adherent/profile" , adherentVerification , adherentController.adherentProfile);

//! Get a adherent by ID
adherentRouter.get("/adherents/:id" , adherentController.getAdherentById);

//! Validate the adherent's account
adherentRouter.put("/validate/:id" , adherentController.validateAndInvalidateAdherentAccount);

//! Updating the adherent's data 
adherentRouter.put("/adherents/:id"  , adherentController.updateAdherent);

//! Update profile information
adherentRouter.put('/adhernet/profile/update/information'
  , 
 [
  body("first_name")
      .trim()
      .notEmpty()
      .withMessage("the first name is required")
      .isAlpha()
      .withMessage("please enter a valid first name"),
  body("last_name")
    .trim()
    .notEmpty()
    .withMessage("the last name is required")
    .isAlpha()
    .withMessage("please enter a valid last name"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("the email is required")
    .isEmail()
    .withMessage("please enter a valid email"),
  body("password")
    .trim()
    .notEmpty().withMessage("the password is required")
 ] ,
 adherentController.adherentCanUpdate) ;

//! Block or unblock a adherent 
adherentRouter.put("/adherents/block-unblock/:id"  , adherentController.blockOrUnblock) ;



module.exports = adherentRouter;
