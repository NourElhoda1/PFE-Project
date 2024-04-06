const express = require('express') ;
const reviewController = require('../controllers/reviewController');
const reviewRouter = express.Router() ;
const { body } = require('express-validator') ;
const authUserVerification = require('../middlewares/authUserVerification') ;
const adherentVerification = require('../middlewares/adherentVerification') ;

//! Create a new review
reviewRouter.post(
    '/reviews/add' ,
    [
        body("review_description")
            .trim()
            .notEmpty().withMessage("the review is required") ,
        body("buyerId")
            .trim()
            .notEmpty().withMessage("the buyer's name is required") ,
        body("serviceId")
            .trim()
            .notEmpty().withMessage("the service's name is required")
    ],
    adherentVerification ,
    reviewController.createReview
) ; 

//! List all the reviews
reviewRouter.get('/reviews' , reviewController.listingReviews) ;

//! Get a review by ID
reviewRouter.get('/reviews/:id' , reviewController.getReviewById) ;

//! Delete a review
reviewRouter.delete('/reviews/:id' , authUserVerification , reviewController.deleteReview) ;

module.exports = reviewRouter ;
