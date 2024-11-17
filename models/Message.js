// import mongoose, { Schema } from "mongoose"

// const messageSchema = new mongoose.Schema({

//     senderId:{
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User",
//         required: true
//     },

//     receiverId:{
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User",
//         required: true
//     },

//     message:{
//         type: String,
//         required: true
//     }

//     //created at, updated at
// },{timestamps: true})

// const Message = mongoose.model("Message", messageSchema);

// export default Message;

// // models/Message.js
// import mongoose from 'mongoose';

// const messageSchema = new mongoose.Schema({
//     conversationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Conversation' },
//     sender: { type: Number, required: true },
//     receiver: { type: Number, required: true },
//     content: { type: String, required: true },
//     createdAt: { type: Date, default: Date.now }
// });

// export default mongoose.model('Message', messageSchema);

// import mongoose from 'mongoose';

// const messageSchema = new mongoose.Schema({
//     conversationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Conversation' },
//     senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//     receiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//     text: { type: String, required: true },
//     createdAt: { type: Date, default: Date.now },
// });

// export default mongoose.model('Message', messageSchema);

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


