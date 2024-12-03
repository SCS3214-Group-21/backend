import 'dotenv/config'; // dotenv does not support ES Module imports directly
import express from 'express';
import http from 'http'; // Import http to create server
import { Server } from 'socket.io'; // Import Server from socket.io

import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import connectToMongoDB from './config/dbConnMongo.js'; // MongoDB connection
import path from 'path';
import { fileURLToPath } from 'url';
import sequelize from './config/dbConn.js'; // Ensure the path and extension are correct

import authRouter from './routes/authRoute.js';
import webRouter from './routes/webRoute.js';
import blogRouter from './routes/blogRoute.js';
import chatRoute from './routes/chatRoute.js';
import conversationRoutes from './routes/conversationRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import paymentRoute from './routes/paymentRoute.js';
import clientRouter from './routes/clientRoute.js';
import quotationRouter from './routes/quotationRoute.js';

import packageRouter from './routes/packageRoute.js';
import vendorRouter from './routes/vendorprofileRoutes.js';
import budgetRouter from './routes/budgetRoute.js';
import progressRouter from './routes/progressRoute.js';
import bookingRouter from './routes/bookingRoute.js';
import notificationRoute from "./routes/notificationRoute.js";
import eventRouter from "./routes/eventRoutes.js";


const app = express();
const server = http.createServer(app); // Create an HTTP server for Express and Socket.IO

// Initialize Socket.IO on the HTTP server
// const io = new Server(server, { // Renamed SocketIOServer to Server
//     cors: {
//         origin: 'http://localhost:5173', // Set to your frontend URL
//         methods: ['GET', 'POST'],
//     },
// });

// Middleware
app.use(helmet()); // Security headers
app.use(morgan('combined')); // Logger
//app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded requests



// CORS middleware
const corsOptions = {
    origin: ['http://localhost:5173'], // Replace with allowed domains
    optionsSuccessStatus: 200 
};
app.use(cors(corsOptions));

// CORS middleware
// const corsOptions = {
//     origin: 'http://localhost:5173', // Allow frontend origin
//     methods: ['GET', 'POST', 'OPTIONS'], // Allow specific HTTP methods
//     allowedHeaders: ['Content-Type'],  // Allow specific headers
//     credentials: true, // Enable credentials if needed
//     optionsSuccessStatus: 200, 
// };
// app.use(cors(corsOptions));

// Additional headers for CORS and CSP
app.use((req, res, next) => {
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');  // Allow cross-origin requests
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');  // Frontend URL
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');  // Allow methods
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');  // Allow headers
    res.setHeader('Content-Security-Policy', "img-src 'self' http://localhost:3000 http://localhost:5173;");  // Allow images from both frontend and backend
    next();
});




const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// app.use((req, res, next) => {
//     res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');  // Allow cross-origin requests
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');  // Frontend URL
//     res.setHeader('Content-Security-Policy', "img-src 'self' http://localhost:3000;");  // Allow images from the backend
//     next();
// });

// app.use(cors());

app.use('/api', authRouter);
app.use('/', webRouter);
app.use('/blog', blogRouter);
app.use('/package', packageRouter);
app.use('/vendor', vendorRouter);
app.use('/chat', chatRoute); // Add the chat route
app.use('/conversation', conversationRoutes);
app.use('/messages', messageRoutes);
app.use('/payment', paymentRoute);
app.use('/client/profile', clientRouter);
app.use('/budget', budgetRouter);
app.use('/progress', progressRouter);
app.use('/quotation', quotationRouter);
app.use('/booking', bookingRouter);
app.use('/notification', notificationRoute)
app.use('/event', eventRouter)

// Socket.IO events
// io.on('connection', (socket) => {
//     console.log('User connected:', socket.id);

//     socket.on('joinRoom', (roomId) => {
//         socket.join(roomId);
//     });

//     socket.on('sendMessage', (messageData) => {
//         io.to(messageData.conversationId).emit('receiveMessage', messageData);
//     });

//     socket.on('disconnect', () => {
//         console.log('User disconnected:', socket.id);
//     });
// });

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(`Error: ${err.message}`);
    res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error",
    });
});

// Database and Server Initialization
const PORT = process.env.PORT || 3000;

sequelize.authenticate().then(() => {
    console.log('Connected to MySQL');
    connectToMongoDB().then(() => {
        server.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    }).catch(err => {
        console.error('Unable to connect to MongoDB:', err);
    });
}).catch(err => {
    console.error('Unable to connect to MySQL:', err);
});
