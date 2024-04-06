const { validationResult } = require("express-validator");
const adherentModel = require("../models/adherentModel");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwt_secret = process.env.JWT_SECRET;

const adherentController = {

    //! Adherent authentication
    authenticateAdherent: async (req, res) => {
        const { email, password } = req.body;

        //* Check if there are any validation problems
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors);
        }

        try {
            const adherent = await adherentModel.findOne({ email: email });

            //* Check if there is any adherent with this email
            if (adherent) {

                //* Check if the password that came from input is equal to the password that exists in the db
                const comparePasswords = await bcrypt.compare(password, adherent.password);

                if (comparePasswords) {

                    //* Generate the token
                    const token = jwt.sign({ email: email }, jwt_secret);
                    if (token) {
                        res.status(200).json({
                            adherent: adherent,
                            token: token
                        });
                    }
                    else {
                        res.status(401).json({ message: 'Something went wrong with the token' });
                    }
                }
                else {
                    res.status(401).json({ message: 'The password is not correct' });
                }
            }
            else {
                res.status(400).json({ message: 'There is no account with this email' });
            }
        }
        catch (error) {
            console.log(error);
        }
    },

    //! Create a new adherent account
    adherentRegister: async (req, res) => {

        const { 
            first_name,
            last_name, 
            email, 
            password
        } = req.body;

        //* Check if there are any validation problems
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors);
        }

        //* Check if adherent already has an account
        const adherent = await adherentModel.findOne({ email: email });
        if (adherent) {
            return res.status(400).json({ message: 'An account with this email already exists' });
        }

        //* Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //* Create the new adherent
        try {
            const newAdherent = await adherentModel.create({
                first_name: first_name,
                last_name: last_name,
                email: email,
                password: hashedPassword,
            });
            res.status(200).json({
                message: 'Adherent created successfully',
                adherent: newAdherent,
            });
        }
        catch (error) {
            console.log('Something went wrong', error);
        }
    },

    //! Get all the adherents list
    listingAdherents: async (req, res) => {
        try {
            //* Paginate the adherents
            const adherents = await adherentModel.paginate(
                {},
                { page: req.query.page, limit: 100 }
            );
            res.status(200).send(adherents);
        }
        catch (error) {
            console.log('Something went wrong', error);
        }
    },

        //! Search for an adherent
    searchForAdherent: async (req, res) => {
        try {
            const adherent = await adherentModel.paginate(
                { $or: [{ first_name: { $regex: req.query.name } }, { last_name: { $regex: req.query.name } }] },
                { name: req.query.name, page: req.query.page, limit: 5 }
            );
            res.status(200).send(adherent);
        } catch (error) {
            console.log('Something went wrong', error);
        }
    },

    //! Get an adherent by ID
    getAdherentById: async (req, res) => {
        const { id } = req.params;
        try {
            const adherent = await adherentModel.find({ _id: id });
            res.status(200).send(adherent);
        } catch (error) {
            console.log(error);
        }
    },


     //! Validate the adherent's account
    validateAndInvalidateAdherentAccount: async (req, res) => {
        const { id } = req.params;
        try {
            const adherent = await adherentModel.findOne({ _id: id });
            //* Make the account invalid
            if (adherent.valid_account === true) {
                await adherentModel.findByIdAndUpdate(id, { valid_account: false });
                res.status(200).json({ message: 'The account is invalid now' });
            }
            //* Make the account valid
            else {
                await adherentModel.findByIdAndUpdate(id, { valid_account: true });
                res.status(200).json({ message: 'The account is valid now' });
            }
        } catch (error) {
            console.log(error);
        }
    },

    //! Updating the adherent's data
    updateAdherent: async (req, res) => {
        const { 
            first_name, 
            last_name, 
            email, 
            password, 
            valid_account, 
            active 
        } = req.body;
        const { id } = req.params;
        try {
            //* Find the adherent that I want to update their data
            const adherentWantToUpdate = await adherentModel.findOne({ _id: id });
            //* Then update their data
            const adherent = await adherentModel.findByIdAndUpdate(adherentWantToUpdate._id, {
                first_name: first_name,
                last_name: last_name,
                email: email,
                password: adherentWantToUpdate.password,
                active: active,
            });
            res.status(200).json({ message: 'The adherent data has been updated with success' });
        } catch (error) {
            console.log(error);
        }
    },

    //! Block or unblock an adherent
    blockOrUnblock: async (req, res) => {
        const { id } = req.params;
        try {
            const updatedAdherent = await adherentModel.findOne({ _id: id });

            if (!updatedAdherent) {
                return res.status(404).json({ message: 'Adherent not found' });
            }

            const blockOrUnblock = await adherentModel.findByIdAndUpdate(id, {
                active: !updatedAdherent.active,
            }, { new: true });

            if (blockOrUnblock) {
                res.status(200).json({ message: 'Adherent updated successfully', blockOrUnblock });
            }

        } catch (error) {
            console.log(error);
        }
    },

    //! Adherent profile
    adherentProfile: async (req, res) => {
        const id = req.adherent._id;
        const adherent = await adherentModel.findById(id);

        if (adherent) {
            res.status(200).json(adherent);
        } else {
            res.status(400).json('Oops!');
        }
    },

     //! Update profile info
     adherentCanUpdate : async (req , res) => {
        const id = req.user._id ;

        //* Check is there is any validation problem
        const errors = validationResult(req) ;
        if ( !errors.isEmpty() ) {
            return res.status(403).json(errors) ;
        }

        try {
            const { first_name , last_name , email , password } = req.body ;
            
            const adherentInformationUpdated = await adherentModel.findByIdAndUpdate(id.toString() , {
                first_name : first_name ,
                last_name : last_name ,
                email : email ,
                password : password ,
            } , {new : true}) ;
            
            if ( adherentInformationUpdated ) {
                res.status(200).json({
                    message : 'Information has been updated with success' ,
                    newInfo : adherentInformationUpdated ,
                }) ;
            }

        }
        catch ( error ) {
            res.status(400).json(error) ;
        }
    } 

    } 

    module.exports = adherentController;

