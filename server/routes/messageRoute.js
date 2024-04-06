const express = require('express');
const messageRouter = express.Router();
const messageController = require('../controllers/messageController');
const authUserVerification = require('../middlewares/authUserVerification');
const adherentVerification = require('../middlewares/adherentVerification');

//! Create a new message
messageRouter.post('/messages/add', authUserVerification, messageController.createMessage);

//! Get all messages of a conversation
messageRouter.get('/messages/:id', authUserVerification, messageController.listingMessages);

module.exports = messageRouter;
