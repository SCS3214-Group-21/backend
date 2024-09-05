import express, {urlencoded} from 'express'
import cors from 'cors'
import path from 'path'
import cookieParser from 'cookie-parser'
import { fileURLToPath } from 'url'
import { config } from 'dotenv'
import router from './router.js'

// import middleware and utils
import { logEvents } from './middlewares/logEvents.js'
import errorHandler from './middlewares/errorHandler.js'
import corsOptions from './config/corsOptions.js'
import { mysqlPool } from './config/database.js'

config()

// define values
const PORT = process.env.APP_PORT || 4000
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// init app
const app = express()

// use middleware and utils
app.use(logEvents)
app.use(express.json())
app.use(cookieParser())
app.use(errorHandler)
app.use(cors(corsOptions))
app.use(urlencoded({ extended: true }))

// use router
app.use(router)

// database connection
const startServer = async () => {
    try {
        await mysqlPool.getConnection()

        // start the server
        app.listen(PORT, () => {
            console.log(`Server running on port: ${PORT}`)
        })
    }
    catch (err) {
        console.error("Failed to connect to Database ", err)
    }
}

startServer()