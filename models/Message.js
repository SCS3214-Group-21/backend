import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    conversationId: { type: String, required: true },
    senderId: { type: Number, required: true },
    receiverId: { type: Number, required: true },
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

const Message = mongoose.model('Message', messageSchema);

export default Message;


