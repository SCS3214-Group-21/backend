import express from 'express'
import cors from 'cors'
import path from 'path'
import cookieParser from 'cookie-parser'
import { fileURLToPath } from 'cookie-parser'
import { config } from 'dotenv'



config()

// define values
const PORT = process.env.APP_PORT || 4000
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// init app
const app = express()

