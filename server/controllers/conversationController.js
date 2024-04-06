const conversationModel = require('../models/conversationModel');

const conversationController = {
    //! Create a new conversation
    createConversation : async (req , res) => {
        const newConversation = new conversationModel({
            id: req.isSeller ? req.adherentId + req.body.to : req.body.to + req.adherentId,
            sellerId: req.isSeller ? req.userId : req.body.to,
            buyerId: req.isSeller ? req.body.to : req.adherentId,
            readBySeller: req.isSeller,
            readByBuyer: !req.isSeller,
        });
            
        try {
            const savedConversation = await newConversation.save();
            res.status(200).json({
                message : 'Conversation created with success',
                conversation : savedConversation, 
            });
        }
        catch ( error ) {
            console.log('Something went wrong' , error);
            res.status(500).json({ message: 'Something went wrong' });
        }
    },
    
    //! Update a conversation
    updateConversation : async (req , res) => {
        try {
            const updatedConversation = await conversationModel.findOneAndUpdate(
                { id: req.params.id }, 
                { $set: {  
                     ...(req.isSeller ? { readBySeller: true } : { readByBuyer: true }),
                    }, 
                },
                { new: true }
            );
            res.status(200).json({
                message : 'Conversation updated with success',
                conversation : updatedConversation, 
            });
        }
        catch ( error ) {
            console.log('Something went wrong' , error);
            res.status(500).json({ message: 'Something went wrong' });
        }
    },

    //! Get all conversations list
    listingConversations : async (req , res) => {
        try {
            const conversations = await conversationModel.find(
              req.isSeller ? { sellerId: req.adherentId } : { buyerId: req.adherentId }
            ).sort({ updatedAt: -1 });
            res.status(200).send(conversations);
        }
        catch ( error ) {
            console.log('Something went wrong' , error);
            res.status(500).json({ message: 'Something went wrong' });
        }
    },

    //! Get a conversation by ID
    getConversationById : async (req , res) => {
        const { id } = req.params;
        try {
            const conversation = await conversationModel.findOne({ id: req.params.id });
            if (!conversation) return next(createError(404, "Not found!"));
            res.status(200).send(conversation);
        }
        catch ( error ) {
            console.log('Something went wrong' , error);
            res.status(500).json({ message: 'Something went wrong' });
        }
    },
};

module.exports = conversationController ;