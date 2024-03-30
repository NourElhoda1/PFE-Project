const express = require("express");
const adherentController = require("../controllers/adherentController.js");
const adherentRouter = express.Router();
const { body } = require("express-validator");
const customerVerification = require('../middlewares/adherentVerification.js') ;
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
] , adherentController.authenticateUser) ;

//! Create new adherent ( Register )
adherentRouter.post(
  "/adherents/register",
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
adherentRouter.put(
  "/adherents/:id" ,
  [
    body("first_name")
      .trim()
      .notEmpty().withMessage("the first name is required")
      .isAlpha().withMessage("please enter a valid first name"),
    body("last_name")
      .trim()
      .notEmpty().withMessage("the last name is required")
      .isAlpha().withMessage("please enter a valid last name"),
    body("email")
      .trim()
      .notEmpty().withMessage("the email is required")
      .isEmail().withMessage("please enter a valid email") ,
    body("active")
      .trim()
      .notEmpty().withMessage('please choose the account activation')
      .isBoolean().withMessage('please enter a valid value of the activation account')
  ],
  adherentController.updateAdherent
);

//! Block or unblock a adherent 
adherentRouter.put("/adherents/block-unblock/:id" , adherentVerification , adherentController.blockOrUnblock) ;

module.exports = adherentRouter;
