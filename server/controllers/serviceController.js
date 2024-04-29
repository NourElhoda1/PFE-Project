const { validationResult } = require('express-validator');
const serviceModel = require('../models/serviceModel');


const serviceController = {
    //! Create new service
    createService : async (req , res) => {

        const{
            service_name,
            categoryId,
            subcategoryId,
            sellerId,
            images,
            price,
            short_description,
            long_description
        } = req.body;

        //* Check if there is an error in the Validation
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json( errors );
        }

        try {
            const service = await serviceModel.create({
                service_name : service_name ,
                categoryId : categoryId ,
                subcategoryId : subcategoryId ,
                sellerId : sellerId ,
                images : images ,
                price : price ,
                short_description : short_description ,
                long_description : long_description ,
            });

            const populatedService = await serviceModel
            .findById(service._id)
            .populate('categoryId')
            .populate('subcategoryId')
            .populate('sellerId')
            .exec();

            res.status(200).json({
                message : 'The service has been created with success' ,
                service : populatedService , 
            });
        }
        catch ( error ) {
            console.log('Something went wrong' , error);
            res.status(500).json({ message: 'Something went wrong' });
        }
    },

    //! List all the service list
    listingServices: async (req, res) => {
        try {
          var options = {
            sort : { created_at: -1 } ,
            lean : true ,
            populate : ['sellerId' , 'categoryId' , 'subcategoryId'] ,
            page : req.query.page || 1 ,
            limit : 100 ,
          };
    
          //* Paginate with populate
          const services = await serviceModel.paginate( {} , options );
    
          if ( services ) {
            res.status(200).send(services);
          }
        } 
        catch (error) {
          console.log("Something went wrong", error);
        }
      },

    //! Get a service by ID
    getServiceById : async (req , res) => {
        const { id } = req.params;
        try {
            const service = await serviceModel.findOne({ _id : id });
            res.status(200).send(service);
        }
        catch ( error ) {
            console.log('Something went wrong' , error);
            res.status(500).json({ message: 'Something went wrong' });
        }
    },

    //! Update the service data
    updateService : async (req , res) => {
        const{
            service_name,
            categoryId,
            subcategoryId,
            sellerId,
            images,
            price,
            short_description,
            long_description
        } = req.body;
        const { id } = req.params;

        //* Check is there is any validation problem
        const errors = validationResult(req) ;
        if ( !errors.isEmpty() ) {
            return res.status(400).json(errors) ;
        } 

        try {
            // find the service to update 
            const serviceToUpdate =  await serviceModel.findOne({ _id: id });

            // update the service
            await serviceModel.findOneAndUpdate(serviceToUpdate._id ,{
                    service_name : service_name ,
                    categoryId : categoryId ,
                    subcategoryId : subcategoryId ,
                    sellerId : sellerId ,
                    images : images ,
                    price : price ,
                    short_description : short_description ,
                    long_description : long_description ,
                });
            res.status(200).json({
                message : 'The service has been updated with success' ,
                service : service , 
            });
        }
        catch ( error ) {
            console.log('Something went wrong' , error);
            res.status(500).json({ message: 'Something went wrong' });
        }
    },

    //! Delete a service
    deleteService : async (req , res) => {
        const { id } = req.params;
        try {
             await serviceModel.findByIdAndDelete(id);
            res.status(200).json({ message: 'The service has been deleted with success' });
        }
        catch ( error ) {
            console.log('Something went wrong' , error);
            res.status(500).json({ message: 'Something went wrong' });
        }
    },

      //! Search for a service
      searchForService: async (req, res) => {
        try {
          const service = await serviceModel.paginate(
            { service_name: req.query.name },
            { name: req.query.name, page: req.query.page, limit: 1 }
          );
          res.status(200).send(service);
        } catch (error) {
          console.log("Something went wrong", error);
        }
      }

}

module.exports = serviceController;