const express = require('express') ;
const chatController = require('../controllers/chatController');
const chatRouter = express.Router() ;


//! Create a new chat
chatRouter.post('/chats/add' , chatController.createChat) ;

//! Get a chat by ID
chatRouter.get('/chats/:userId' , chatController.userChats) ;

//! Get a chat by users ID
chatRouter.get('/chats/find/:firstId/:secondId' , chatController.findChat) ;



module.exports = chatRouter ;