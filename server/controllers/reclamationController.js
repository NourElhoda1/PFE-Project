const { validationResult } = require("express-validator");
const reclamationModel = require("../models/reclamationModel");

const reclamationController = {
    //! Create new reclamation
    createReclamation : async (req , res) => {

        const{
            reclamation_name,
            reclamation_description,
            buyerId,
            serviceId,
            created_at
        } = req.body;

        //* Check if there is an error in the Validation
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json( errors );
        } 

        try {
            const reclamation = await reclamationModel.create({
                reclamation_name : reclamation_name ,
                reclamation_description : reclamation_description ,
                buyerId : buyerId ,
                serviceId : serviceId ,
                created_at : created_at ,
            });

            const populatedReclamation = await reclamationModel
            .findById(reclamation._id)
            .populate('buyerId')
            .populate('serviceId')
            .exec();

            res.status(200).json({
                message : 'The reclamation has been created with success' ,
                reclamation : populatedReclamation , 
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
            //* Here are my option that i will use to paginate
           var options = {
               sort : { created_at: -1 } ,
               lean : true ,
               populate : ['buyerId' , 'serviceId'] ,
               page : req.query.page  ,
               limit : 100 ,
           };

           //* Paginate with populate
           const reclamations = await reclamationModel.paginate({} , options) ;   
           
           //* Send all subcategories with the name of the category
           if ( reclamations ) {
               res.status(200).json(reclamations);
           }
     
       } 
       catch ( error ) {
       res.status(403).json({
           message : 'Something went wrong' ,
           error : error ,
       });
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

    //! Search for reclamation
    searchForReclamation : async (req , res) => {
        try {
            const reclamation = await reclamationModel.find({ ...req.query });
            res.status(200).send(reclamation);
        }
        catch ( error ) {
            console.log('Something went wrong' , error);
            res.status(500).json({ message: 'Something went wrong' });
        }
    },

};

module.exports = reclamationController ;