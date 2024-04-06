const express = require('express');
const conversationRouter = express.Router();
const conversationController = require('../controllers/conversationController');
const authUserVerification = require('../middlewares/authUserVerification');
const adherentVerification = require('../middlewares/adherentVerification');

//! Create a new conversation
conversationRouter.post('/conversations/add', authUserVerification, conversationController.createConversation);

//! Update a conversation
conversationRouter.put('/conversations/:id', authUserVerification, conversationController.updateConversation);

//! Get all conversations list
conversationRouter.get('/conversations', authUserVerification, conversationController.listingConversations);

//! Get a conversation by ID
conversationRouter.get('/conversations/:id', authUserVerification, conversationController.getConversationById);

module.exports = conversationRouter ;