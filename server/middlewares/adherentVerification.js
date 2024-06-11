const jwt = require('jsonwebtoken');
const AdherentModel = require('../models/adherentModel');

const adherentVerification = async (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Unauthorized: Authorization header is missing or invalid' });
        }
        const token = authorizationHeader.split(' ')[1];

        if (token) {
            let decoded;
            try {
                decoded = jwt.verify(token, process.env.JWT_SECRET);
            } catch (err) {
                if (err.name === 'TokenExpiredError') {
                    return res.status(401).json({ error: 'Unauthorized: jwt expired' });
                }
                throw err;
            }

            // Find the user with the email
            const adherent = await AdherentModel.findOne({ email: decoded.email });
            if (adherent) {
                req.adherent = adherent;  // Set the adherent on req object
                next();
            } else {
                res.status(404).json({ error: 'Adherent not found' });
            }
        } else {
            res.status(403).json({ message: 'Something went wrong in the adherent token' });
        }
    } catch (err) {
        res.status(401).send({ error: 'Unauthorized: ' + err.message });
    }
};

module.exports = adherentVerification;
