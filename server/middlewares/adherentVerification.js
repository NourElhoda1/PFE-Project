const jwt = require('jsonwebtoken') ;
const AdherentModel = require('../models/adherentModel');

const adherentVerification = async ( req , res , next ) => {

    //! Get token from headers 
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    const token = authorizationHeader.split(' ')[1];

    if ( token ) {
        const decoded = jwt.verify(token , process.env.JWT_SECRET) ;

        //* Find the user with the email
        const adherent = await AdherentModel.findOne({email : decoded.email}) ;
        if ( adherent ) {
            req.adherent = adherent ;
            next() ;
        }
    } 
    else {
        res.status(403).json({message : 'something went wrong in the adherent token'}) ;
    }
}

module.exports = adherentVerification ;
