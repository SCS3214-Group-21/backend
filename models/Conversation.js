// import mongoose from "mongoose";

// const conversationSchema = new mongoose.Schema({

//     participants:[{
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User",
//     }],

//     messages:[{
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Message",
//         default:[],  //starting conversation 
//     }]
// },{timestamps:true});

// const Conversation = mongoose.model("Conversation", conversationSchema);

// export default Conversation;

// // models/Conversation.js
// import mongoose from 'mongoose';

// const conversationSchema = new mongoose.Schema({
//     participants: [
//         { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Client and vendor IDs
//     ],
//     lastMessage: { type: String },
//     updatedAt: { type: Date, default: Date.now }
// });

// export default mongoose.model('Conversation', conversationSchema);

import mongoose from 'mongoose';

const conversationSchema = new mongoose.Schema({
    conversationId: { type: String, unique: true, required: true },
    participants: [Number],
    lastMessage: { type: String },
    updatedAt: { type: Date, default: Date.now },
});

const Conversation = mongoose.model('Conversation', conversationSchema);

export default Conversation;





