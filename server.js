import 'dotenv/config'; // dotenv does not support ES Module imports directly
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
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
// const corsOptions = {
//     origin: ['http://localhost:3000/'], // Replace with allowed domains
//     optionsSuccessStatus: 200 
// };
// app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

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