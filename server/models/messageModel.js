const mongoose = require("mongoose");
const mongoosePagination = require('mongoose-paginate-v2')

const messageSchema = new mongoose.Schema({
    conversationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Conversation",
        required: true,
    },

    adherentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Adherent",
        required: true,    
    },

    message: {
        type: String,
        required: true,
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });

messageSchema.plugin(mongoosePagination);
const messageModel = mongoose.model("Message", messageSchema);
module.exports = messageModel