const express = require('express');
const messageController = require('../controllers/messageController');
const messageRouter = express.Router();


//! Create a new message
messageRouter.post('/messages/add' , messageController.addMessage) ;

//! Get a Message
messageRouter.get('/messages/:chatId' , messageController.getMessages) ;


module.exports = messageRouter ;


