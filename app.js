import express from 'express'
import cors from 'cors'
import path from 'path'
import cookieParser from 'cookie-parser'
import { fileURLToPath } from 'url'
import { config } from 'dotenv'

// import middleware and utils
import { logger } from './middlewares/logger.js'
import errorHandler from './middlewares/errorHandler.js'
import { connectToDb } from './config/database.js'

config()

// define values
const PORT = process.env.APP_PORT || 4000
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// init app
const app = express()

// use middleware and utils
app.use(logger)
app.use(express.json())
app.use(cookieParser())
app.use(errorHandler)

// database connection
connectToDb((err) => {
    if (err) {
        console.error("Failed to connect to DB", err)
    }

    // start the server
    app.listen(PORT, () => {
        console.log(`Server running on port: ${PORT}`)
    })
})