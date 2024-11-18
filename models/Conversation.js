import mongoose from 'mongoose';

const conversationSchema = new mongoose.Schema({
    conversationId: { type: String, unique: true, required: true },
    participants: [Number],
    lastMessage: { type: String },
    updatedAt: { type: Date, default: Date.now },
});

const Conversation = mongoose.model('Conversation', conversationSchema);

export default Conversation;





