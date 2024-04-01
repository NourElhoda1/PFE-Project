const { validationResult } = require("express-validator");
const reclamationModel = require("../models/reclamationModel");

const reclamationController = {
    //! Create new reclamation
    createReclamation : async (req , res) => {

        const{
            reclamation_description,
        } = req.body;

        //* Check if there is an error in the Validation
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json( errors );
        } 

        try {
            const reclamation = await reclamationModel.create({
                reclamation_description : reclamation_description ,
            });
            res.status(200).json({
                message : 'The reclamation has been created with success' ,
                reclamation : reclamation , 
            });
        }
        catch ( error ) {
            console.log('Something went wrong' , error);
            res.status(500).json({ message: 'Something went wrong' });
        }
    },

    //! List all the reclamation list
    listingReclamations : async (req , res) => {
        try {
            //* Paginate the reclamations
            const reclamations = await reclamationModel.paginate(
                {}, 
                { page : req.query.page , limit : 100 }
            );
            res.status(200).send(reclamations);
        }
        catch ( error ) {
            console.log('Something went wrong' , error);
            res.status(500).json({ message: 'Something went wrong' });
        }
    },

    //! Get a reclamation by ID
    getReclamationById : async (req , res) => {
        const { id } = req.params;
        try {
            const reclamation = await reclamationModel.findOne({ _id : id });
            res.status(200).send(reclamation);
        }
        catch ( error ) {
            console.log('Something went wrong' , error);
            res.status(500).json({ message: 'Something went wrong' });
        }
    },

    //! Delete a reclamation
    deleteReclamation : async (req , res) => {
        const { id } = req.params;
        try {
            const reclamation = await reclamationModel.findByIdAndDelete(id);
            res.status(200).json({
                message : 'The reclamation has been deleted with success' ,
                reclamation : reclamation , 
            });
        }
        catch ( error ) {
            console.log('Something went wrong' , error);
            res.status(500).json({ message: 'Something went wrong' });
        }
    },

};

module.exports = reclamationController ;