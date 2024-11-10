import 'dotenv/config'; // dotenv does not support ES Module imports directly
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import sequelize from './config/dbConn.js'; // Ensure the path and extension are correct

import authRoute from './routes/authRoute.js';
import webRouter from './routes/webRoute.js';
import blogRouter from './routes/blogRoute.js';

const app = express();

// Security middleware
app.use(helmet());

// Logger middleware
app.use(morgan('combined'));

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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

app.use('/api', authRoute);
app.use('/', webRouter);
app.use('/blog',blogRouter);


//error handling
app.use((err, req, res, next) => {
    console.error(`Error: ${err.message}`);  // Log error details
    res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error",
    });
});

const PORT = process.env.PORT || 3000;

sequelize.authenticate().then(() => {
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});