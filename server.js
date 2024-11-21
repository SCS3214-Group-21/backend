// import 'dotenv/config'; // dotenv does not support ES Module imports directly
// import express from 'express';
// import cors from 'cors';
// import helmet from 'helmet';
// import morgan from 'morgan';
// import sequelize from './config/dbConn.js'; // Ensure the path and extension are correct
// import connectToMongoDB from './config/dbConnMongo.js';  // MongoDB connection

// import authRoute from './routes/authRoute.js';
// import webRouter from './routes/webRoute.js';
// import blogRouter from './routes/blogRoute.js';
// import verifyJWT from './middlewares/verifyJWT.js';
// import messageRoutes from './routes/message.routes.js'
// import userRoutes from './routes/user.routes.js'

// const app = express();

// // Security middleware
// app.use(helmet());

// // Logger middleware
// app.use(morgan('combined'));

// // CORS middleware
// // const corsOptions = {
// //     origin: ['http://localhost:3000/'], // Replace with allowed domains
// //     optionsSuccessStatus: 200 
// // };
// // app.use(cors(corsOptions));

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.use(cors());

// app.use('/api', authRoute);
// app.use('/', webRouter);
// app.use('/blog',blogRouter);
// app.use('/api/messages', verifyJWT, messageRoutes);
// app.use('/api/users', verifyJWT, userRoutes);

// //error handling
// app.use((err, req, res, next) => {
//     console.error(`Error: ${err.message}`);  // Log error details
//     res.status(err.statusCode || 500).json({
//         message: err.message || "Internal Server Error",
//     });
// });

// const PORT = process.env.PORT || 3000;

// sequelize.authenticate().then(() => {
//     console.log('Connected to MySQL');
//      // Connect to MongoDB
//      connectToMongoDB().then(() => {
//         // Start the server after successful MongoDB connection
//         app.listen(PORT, () => {
//             console.log(`Server is running on port ${PORT}`);
//         });
//     }).catch(err => {
//         console.error('Unable to connect to MongoDB:', err);
//     });

// })
// .catch(err => {
//     console.error('Unable to connect to MySQL:', err);
// });


import 'dotenv/config'; // dotenv does not support ES Module imports directly
import express from 'express';
import http from 'http'; // Import http to create server
import { Server } from 'socket.io'; // Import Server from socket.io

import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import sequelize from './config/dbConn.js'; // MySQL connection
import connectToMongoDB from './config/dbConnMongo.js'; // MongoDB connection

import authRoute from './routes/authRoute.js';
import webRouter from './routes/webRoute.js';
import blogRouter from './routes/blogRoute.js';
import chatRoute from './routes/chatRoute.js';
import conversationRoutes from './routes/conversationRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import paymentRoute from './routes/paymentRoute.js';
import clientRouter from './routes/clientRoute.js';


const app = express();
const server = http.createServer(app); // Create an HTTP server for Express and Socket.IO

// Initialize Socket.IO on the HTTP server
const io = new Server(server, { // Renamed SocketIOServer to Server
    cors: {
        origin: 'http://localhost:3000', // Set to your frontend URL
        methods: ['GET', 'POST'],
    },
});

// Middleware
app.use(helmet()); // Security headers
app.use(morgan('combined')); // Logger
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded requests

// Routes
app.use('/api', authRoute);
app.use('/', webRouter);
app.use('/blog', blogRouter);
app.use('/chat', chatRoute); // Add the chat route
app.use('/conversation', conversationRoutes);
app.use('/messages', messageRoutes);
app.use('/payment', paymentRoute);
app.use('/client/profile', clientRouter)

// Socket.IO events
io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('joinRoom', (roomId) => {
        socket.join(roomId);
    });

    socket.on('sendMessage', (messageData) => {
        io.to(messageData.conversationId).emit('receiveMessage', messageData);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

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
