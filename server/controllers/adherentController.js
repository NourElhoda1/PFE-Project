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
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const adherent = await adherentModel.findOne({ email: email });

            //* Check if there is any adherent with this email
            if (!adherent) {
                return res.status(400).json({ message: 'There is no account with this email' });
            }

            //* Check if the password that came from input is equal to the password that exists in the db
            const comparePasswords = await bcrypt.compare(password, adherent.password);
            if (!comparePasswords) {
                return res.status(401).json({ message: 'The password is not correct' });
            }

            //* Generate the token
            const token = jwt.sign({ email: email, id: adherent._id }, jwt_secret, { expiresIn: '1h' });
            if (!token) {
                return res.status(500).json({ message: 'Something went wrong with the token' });
            }

            //* Remove password from the adherent object before sending
            const { password: _, ...adherentWithoutPassword } = adherent.toObject();

            res
                .cookie("access_token", token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                })
                .status(200)
                .json({ adherent: adherentWithoutPassword, token });

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    //! Logout
    Adherentlogout: (req, res) => {
        res
            .clearCookie("access_token", {
                sameSite: "none",
                secure: process.env.NODE_ENV === "production",
            })
            .status(200)
            .send("adherent has been logged out.");
    },

    //! Create a new adherent account
    adherentRegister: async (req, res) => {
        const { 
            first_name, last_name, email, password, number, country, city, profile_pic, 
            careerStatus, about, resume, education, experiences, projects, skills, languages 
        } = req.body;
        //* Check if there are any validation problems
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        //* Check if adherent already has an account
        const existingAdherent = await adherentModel.findOne({ email: email });
        if (existingAdherent) {
            return res.status(400).json({ message: 'An account with this email already exists' });
        }

        //* Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //* Create the new adherent
        try {
            const newAdherent = await adherentModel.create({
                first_name,
                last_name,
                email,
                password: hashedPassword,
                number,
                country,
                city,
                profile_pic,
                careerStatus,
                about,
                resume,
                education,
                experiences,
                projects,
                skills,
                languages
            });
            res.status(201).json({
                message: 'Adherent created successfully',
                adherent: newAdherent,
            });
        } catch (error) {
            console.error('Something went wrong', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    //! Get all the adherents list
    listingAdherents: async (req, res) => {
        try {
            //* Paginate the adherents
            const adherents = await adherentModel.paginate({}, { page: req.query.page, limit: 100 });
            res.status(200).json(adherents);
        } catch (error) {
            console.error('Something went wrong', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    //! Search for an adherent
    searchForAdherent: async (req, res) => {
        try {
            const adherent = await adherentModel.paginate(
                { $or: [{ first_name: { $regex: req.query.name, $options: 'i' } }, { last_name: { $regex: req.query.name, $options: 'i' } }] },
                { page: req.query.page, limit: 5 }
            );
            res.status(200).json(adherent);
        } catch (error) {
            console.error('Something went wrong', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    //! Get an adherent by ID
    getAdherentById: async (req, res) => {
        const { id } = req.params;
        try {
            const adherent = await adherentModel
                .findOne({ _id: id })
                .populate({ path: 'serviceId', select: 'service_name' })
            if (!adherent) {
                return res.status(404).json({ message: 'Adherent not found' });
            }
            res.status(200).json(adherent);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    //! Validate or invalidate the adherent's account
    validateAndInvalidateAdherentAccount: async (req, res) => {
        const { id } = req.params;
        try {
            const adherent = await adherentModel.findById(id);
            if (!adherent) {
                return res.status(404).json({ message: 'Adherent not found' });
            }
            const updatedAdherent = await adherentModel.findByIdAndUpdate(id, { valid_account: !adherent.valid_account }, { new: true });
            res.status(200).json({ message: `The account is now ${updatedAdherent.valid_account ? 'valid' : 'invalid'}` });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    //! Update the adherent's data
    updateAdherent: async (req, res) => {
        const { 
            first_name, last_name, email, number, country, city, valid_account, active, profile_pic, 
            careerStatus, about, resume, education, experiences, projects, skills, languages 
        } = req.body;
        const { id } = req.params;

        //* Check if there are any validation problems
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const updatedAdherent = await adherentModel.findByIdAndUpdate(id, {
                first_name,
                last_name,
                email,
                number,
                country,
                city,
                valid_account,
                active,
                profile_pic,
                careerStatus,
                about,
                resume,
                education,
                experiences,
                projects,
                skills,
                languages
            }, { new: true });
            if (!updatedAdherent) {
                return res.status(404).json({ message: 'Adherent not found' });
            }
            res.status(200).json({ message: 'The adherent data has been updated successfully', adherent: updatedAdherent });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    //! Block or unblock an adherent
    blockOrUnblock: async (req, res) => {
        const { id } = req.params;
        try {
            const adherent = await adherentModel.findById(id);
            if (!adherent) {
                return res.status(404).json({ message: 'Adherent not found' });
            }
            adherent.active = !adherent.active;
            await adherent.save();
            res.status(200).json({ message: `Adherent has been ${adherent.active ? 'unblocked' : 'blocked'}`, adherent });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    //! Adherent profile
    // adherentProfile: async (req, res) => {
    //     const id = req.adherent?._id
    //     const adherent = await adherentModel.findById(id) ;

    //     if ( adherent ) {
    //         res.status(200).json(user) ;
    //     }
    //     else {
    //         res.status(400).json('oops !') ;
    //     }
    // } ,
    adherentProfile: async (req, res, next) => {
        try {
            if(!req.adherent) {
                throw new Error('Adherent not set in response object.');
            }
            const adherent = req.adherent;
            // const name = `${adherent.first_name} ${adherent.last_name}`;
            res.status(200).json({
                status: 'success',
                data: {
                    adherent,
                },
            });
            console.log(adherent)
        } catch (error) {
            console.error('Error in adherentProfile:', error.message);
            next(error);
        }
    },
    

    // adherentProfile: async (req, res, next) => {
    //     try{
    //         const adherent = req.cookies.adherent;
    //         res.status(200).json(adherent);

    //         if (!adherent) {
    //             return res.status(401).json({ 
    //                 status: 'error',
    //                 message: 'adherent is not Unauthorized',
    //              });
    //         }

    //         res.status(200).json({ 
    //              status: 'success',
    //              message: 'adherent is Authorized',
    //             });
    //     }catch(error){
    //         next(error);
    //     }
    // } ,

    //! Get an adherent's profile by ID
    getAdherentProfileById: async (req, res) => {
        const { id } = req.params;
        try {
            const adherent = await adherentModel.findById(id);
            if (!adherent) {
                return res.status(404).json({ message: 'Adherent not found' });
            }
            res.status(200).json(adherent);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },


    //! Update profile info
        // Update profile info
        adherentCanUpdateProfile : async (req, res) => {
            try {
                const id = req.adherent._id;
        
                // Check for validation errors
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.status(400).json({ errors: errors.array() });
                }
        
                const { 
                    first_name, last_name, email, number, country, city, profile_pic, 
                    careerStatus, about, resume, education, experiences, projects, skills, languages 
                } = req.body;
        
                const adherent = await adherentModel.findById(id);
                if (!adherent) {
                    return res.status(404).json({ message: 'Adherent not found' });
                }
        
                adherent.first_name = first_name;
                adherent.last_name = last_name;
                adherent.email = email;
                adherent.number = number;
                adherent.country = country;
                adherent.city = city;
                adherent.profile_pic = profile_pic;
                adherent.careerStatus = careerStatus;
                adherent.about = about;
                adherent.resume = resume;
                adherent.education = education;
                adherent.experiences = experiences;
                adherent.projects = projects;
                adherent.skills = skills;
                adherent.languages = languages;
        
                await adherent.save();
                res.status(200).json({ message: 'Profile updated successfully', adherent });
            } catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Internal server error' });
            }
        },


        // Update about
        adherentCanUpdateAbout : async (req, res) => {
            try {
                const id = req.adherent._id;
        
                // Check for validation errors
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.status(400).json({ errors: errors.array() });
                }
        
                const { 
                    
                    careerStatus, about, skills, languages 
                } = req.body;
        
                const adherent = await adherentModel.findById(id);
                if (!adherent) {
                    return res.status(404).json({ message: 'Adherent not found' });
                }
        
                
                adherent.careerStatus = careerStatus;
                adherent.about = about;
                adherent.skills = skills;
                adherent.languages = languages;
        
                await adherent.save();
                res.status(200).json({ message: 'Profile updated successfully', adherent });
            } catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Internal server error' });
            }
        },


        //Update Education
        adherentCanUpdateEducation: async (req, res) => {
            try {
                const id = req.adherent._id;
        
                // Check for validation errors
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.status(400).json({ errors: errors.array() });
                }
        
                const { 
                    educationList 
                } = req.body;
        
                const adherent = await adherentModel.findById(id);
                if (!adherent) {
                    return res.status(404).json({ message: 'Adherent not found' });
                }
        
                adherent.education = educationList ;
                
                await adherent.save();
                res.status(200).json({ message: 'Profile updated successfully', adherent });
            } catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Internal server error' });
            }
        },

         // Update profile experiences
         adherentCanUpdateExperiences: async (req, res) => {
            try {
                const id = req.adherent._id;
        
                // Check for validation errors
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.status(400).json({ errors: errors.array() });
                }
        
                const { experiencesList } = req.body;
        
                // Logging the received data for debugging
                console.log("Received experiences data:", experiencesList);
                console.log("Data type:", typeof experiencesList);
                console.log("Is Array:", Array.isArray(experiencesList));
        
                const adherent = await adherentModel.findById(id);
                if (!adherent) {
                    return res.status(404).json({ message: 'Adherent not found' });
                }
        
                // Ensure experiencesList is an array of objects
                if (Array.isArray(experiencesList) && experiencesList.every(item => typeof item === 'object')) {
                    adherent.experiences = experiencesList;
                } else {
                    return res.status(400).json({ message: 'Invalid data format for experiences' });
                }
        
                // Save updated adherent
                await adherent.save();
        
                res.status(200).json({ message: 'Profile updated successfully', adherent });
            } catch (error) {
                console.error("Error updating experiences:", error);
                res.status(500).json({ message: 'Internal server error' });
            }
        },

         //Update Portfolio
         adherentCanUpdatePortfolio: async (req, res) => {
            try {
                const id = req.adherent._id;
        
                // Check for validation errors
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.status(400).json({ errors: errors.array() });
                }
        
                const { 
                    projectList 
                } = req.body;
        
                const adherent = await adherentModel.findById(id);
                if (!adherent) {
                    return res.status(404).json({ message: 'Adherent not found' });
                }
        
                adherent.projects = projectList ;
                
                await adherent.save();
                res.status(200).json({ message: 'Profile updated successfully', adherent });
            } catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Internal server error' });
            }
        },
        
        

            //! Update password
            adherentCanUpdatePassword : async (req, res) => {
                const id = req.adherent._id;

                //* Check if there are any validation problems
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.status(400).json({ errors: errors.array() });
                }

                const { password } = req.body;

                try {
                    const adherent = await adherentModel.findById(id);
                    if (!adherent) {
                        return res.status(404).json({ message: 'Adherent not found' });
                    }

                    const salt = await bcrypt.genSalt(10);
                    adherent.password = await bcrypt.hash(password, salt);

                    await adherent.save();
                    res.status(200).json({ message: 'Password updated successfully', adherent });
                } catch (error) {
                    console.error(error);
                    res.status(500).json({ message: 'Internal server error' });
                }
            },


}

module.exports = adherentController;
