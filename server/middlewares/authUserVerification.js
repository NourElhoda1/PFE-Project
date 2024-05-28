const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const authUserVerification = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader.split(' ')['1'];

        if (token) {
            try {
                const decoded = await jwt.verify(token, process.env.JWT_SECRET);
                const user = await userModel.findById(decoded._id);
                if (user) {
                    req.user = user;
                    next();
                }
            } catch (error) {
                console.log(error?.message);
                res.status(500).json(error);
            }
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

module.exports = authUserVerification;
