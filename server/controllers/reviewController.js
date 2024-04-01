const {validationResult} = require('express-validator');
const reviewModel = require('../models/reviewModel');

const reviewController = {

    //! Create new review
    createReview : async (req , res) => {

        const{
            review_description,  
        } = req.body;

        //* Check if there is an error in the Validation
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json( errors );
        }

        try {
            const review = await reviewModel.create({
                review_description : review_description ,
            });
            res.status(200).json({
                message : 'The review has been created with success' ,
                review : review , 
            }); 
        }
        catch ( error ) {
            console.log('Something went wrong' , error);
            res.status(500).json({ message: 'Something went wrong' });
        }
    },

    //! List all the review list
    listingReviews : async (req , res) => {
        try {
            //* Paginate the reviews
            const reviews = await reviewModel.paginate(
                {}, 
                { page : req.query.page , limit : 100 }
            );
            res.status(200).send(reviews);
        }
        catch ( error ) {
            console.log('Something went wrong' , error);
            res.status(500).json({ message: 'Something went wrong' });
        }
    },  

    //! Get a review by ID
    getReviewById : async (req , res) => {
        const { id } = req.params;
        try {
            const review = await reviewModel.findOne({ _id : id });
            res.status(200).send(review);       
        }
        catch ( error ) {
            console.log('Something went wrong' , error);
            res.status(500).json({ message: 'Something went wrong' });
        }
    },

    //! Delete a review
    deleteReview : async (req , res) => {
        const { id } = req.params;
        try {
            const review = await reviewModel.findByIdAndDelete(id);
            res.status(200).json({
                message : 'The review has been deleted with success' ,
                review : review , 
            });
        }
        catch ( error ) {
            console.log('Something went wrong' , error);
            res.status(500).json({ message: 'Something went wrong' });
        }
    },

};      

module.exports = reviewController;