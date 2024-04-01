const express = require('express') ;
const reviewController = require('../controllers/reviewController');
const reviewRouter = express.Router() ;
const { body } = require('express-validator') ;
const authUserVerification = require('../middlewares/authUserVerification') ;

//! Create a new review
reviewRouter.post(
    '/reviews' ,
    [
        body("review_description")
            .trim()
            .notEmpty().withMessage("the review is required") ,
    ],
    authUserVerification ,
    reviewController.createReview
) ; 

//! List all the reviews
reviewRouter.get('/reviews' , reviewController.listingReviews) ;

//! Get a review by ID
reviewRouter.get('/reviews/:id' , reviewController.getReviewById) ;

//! Delete a review
reviewRouter.delete('/reviews/:id' , authUserVerification , reviewController.deleteReview) ;
