const { validationResult } = require("express-validator");
const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userController = {
    //! Register
    register : async (req , res) => { 

        //* Check is there is any validation problem
        const errors = validationResult(req) ;
        if ( !errors.isEmpty() ) {
            return res.status(400).json(errors) ;
        }
        
        //* checking if the user ia already in the db
        const emailExist = await userModel.findOne({email: req.body.email});
        if(emailExist) return res.status(400).send('Email already exists');
        
        //* hash passwords
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        
        
        //* create a new user
        const user = new userModel({
            first_name: req.body.first_name, 
            last_name: req.body.last_name, 
            user_name: req.body.user_name,
            role: req.body.role,
            email: req.body.email,           
            password: hashedPassword,
           
        });
    
        try {
            await user.save();
            res.status(200).json({
                message : 'The user has been created with success' ,
            });
        }
        catch ( error ) {
            console.log( NativeError );
        }
    },

    //! Login
    login : async(req, res) => {

        //* Check is there is any validation problem
        const errors = validationResult(req) ;
        if ( !errors.isEmpty() ) {
            return res.status(403).json(errors)
        }

        try {
            const { email, password } = req.body;
            const user = await userModel.findOne({ email : email });

            if ( user ) {

                const isValidPassword = await bcrypt.compare(password, user.password) ;

                if ( isValidPassword ) {
                    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

                    if ( token ) {
                        res.status(200).json({ user : user , token : token })
                    }
                }
                else {
                    res.status(200).json({ message : 'the password is incorrect' })
                }
            }
            else {
                res.status(200).json({ message : 'there is no account with this email' })
            }
          } 
          catch (error) {
                res.status(500).json({ msg: error.message });
          }
    },

     //! Get all the users list
     listingUsers :async(req , res) => {
        try {
            const users = await userModel.paginate(
                {}, 
                { page : req.query.page , limit : 100 }
            ) ;
            res.status(200).send(users) ;
        }
        catch ( error ) {
            res.status(500).json({message:error.message});
        }
    },
    
    //! Search for a user
    searchForUser: async (req, res) => {
    try {
        const user = await userModel.paginate({
            $or: [
                { first_name: {$regex : req.query.name} },
                { last_name: {$regex : req.query.name } },
                { user_name: {$regex : req.query.name } }
            ]
        }, { name : req.query.name , limit : 5 });
  
        if (user) {
            res.status(200).json(user);
        } 
        else {
            res.status(401).send("There is no user by this name");
        }
    } 
    catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  
    //! Get a user by ID
    getUserById: async (req , res) => {
        const { id } = req.params ;
        try {
            const user = await userModel.findOne({_id : id}) ;
            res.status(200).json({ user : user }) ;
        }
        catch ( error ) {
            res.status(500).json({ message : error.message });
        }
    },

    //! Update the user's data 
    updateUser: async (req, res) => {
        try {
            const { id } = req.params;
            const { first_name, last_name, email, user_name, role } = req.body ; 

            const updatedUser = await userModel.findOne({_id:id}) ;

            await userModel.findByIdAndUpdate(id, {
                first_name : first_name,
                last_name : last_name,
                user_name : user_name,
                email : email,
                password : updatedUser.password,
                role : role
            });

            if (!updatedUser) {
                return res.status(404).json({ message: 'User not found' });
            }

            res.status(200).json({ message: 'User updated successfully'});
        } 
        catch (error) {
            res.status(500).json(error) ;
        }
    },

    //! Block or unblock an user
    blockOrUnblock : async (req , res) => {
        try {
            const { id } = req.params;

            const updatedUser = await userModel.findOne({_id:id}) ;

            if (!updatedUser) {
                return res.status(404).json({ message: 'User not found' });
            }

            const blockOrUnblock = await userModel.findByIdAndUpdate(id, {
                active : !updatedUser.active ,
            } , { new : true });

            if ( blockOrUnblock ) {
                res.status(200).json({ message: 'User updated successfully' , blockOrUnblock});
            }
        } 
        catch (error) {
            res.status(500).json(error) ;
        }
    } ,

    //! User Profile
    userProfile : async (req , res) => {
        const id = req.user._id
        const user = await userModel.findById(id) ;

        if ( user ) {
            res.status(200).json(user) ;
        }
        else {
            res.status(400).json('oops !') ;
        }
    } ,

    //! Update profile info
    updateProfileInfo : async (req , res) => {
        const id = req.user._id ;

        //* Check is there is any validation problem
        const errors = validationResult(req) ;
        if ( !errors.isEmpty() ) {
            return res.status(403).json(errors) ;
        }

        try {
            const { first_name , last_name , user_name , email } = req.body ;
            
            const userInformationUpdated = await userModel.findByIdAndUpdate(id.toString() , {
                first_name : first_name ,
                last_name : last_name ,
                user_name : user_name ,
                email : email ,
            } , {new : true}) ;
            
            if ( userInformationUpdated ) {
                res.status(200).json({
                    message : 'Information has been updated with success' ,
                    newInfo : userInformationUpdated ,
                }) ;
            }

        }
        catch ( error ) {
            res.status(400).json(error) ;
        }
    } ,
};

module.exports = userController;