const messageModel = require('../models/messageModel');
const conversationModel = require('../models/conversationModel');

const messageController = {
    //! Create a new message
    createMessage : async (req , res) => {
        const newMessage = new messageModel({
            conversationId: req.body.conversationId,
            adherentId: req.adherentId,
            message: req.body.message,
          });
          try {
            const savedMessage = await newMessage.save();
            await conversationModel.findOneAndUpdate(
              { id: req.body.conversationId },
              {
                $set: {
                  readBySeller: req.isSeller,
                  readByBuyer: !req.isSeller,
                  lastMessage: req.body.message,
                },
              },
              { new: true }
            );
        
            res.status(201).send(savedMessage);
          } catch (err) {
            next(err);
          }
    },

    //! Get all messages
    listingMessages : async (req , res) => {
        try {
          const messages = await messageModel
            .find({ conversationId: req.params.id })
            .sort({ createdAt: -1 });
          res.status(200).send(messages);
        } catch (error) {
          console.log('Something went wrong' , error);
          res.status(500).json({ message: 'Something went wrong' });
        }
    },
};

module.exports = messageController ;